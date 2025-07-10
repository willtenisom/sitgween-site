import { buffer } from "micro";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import clientPromise from "../../lib/mongodb";

export const config = {
  api: { bodyParser: false },
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.warn("[WARN] Método inválido:", req.method);
    return res.status(405).json({ error: "Método não permitido" });
  }

  let bodyRaw;
  try {
    bodyRaw = (await buffer(req)).toString();
  } catch (err) {
    console.error("[ERROR] Falha ao ler body:", err);
    return res.status(400).json({ error: "Falha ao ler body" });
  }

  let body;
  try {
    body = JSON.parse(bodyRaw);
    console.log("[DEBUG] Body recebido no webhook:", body);
  } catch (err) {
    console.error("[ERROR] Body inválido:", err);
    return res.status(400).json({ error: "JSON inválido" });
  }

  const paymentId = body?.data?.id;

  if (!paymentId) {
    console.error("[ERROR] Payment ID ausente no payload:", body);
    return res.status(400).json({ error: "Payment ID ausente" });
  }

  console.log("[INFO] Webhook recebido com PaymentID:", paymentId);

  try {
    const mpToken = process.env.MP_ACCESS_TOKEN;

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${mpToken}` },
    });

    const payment = await mpRes.json();

    if (!mpRes.ok) {
      console.error("[ERROR] MercadoPago fetch:", payment);
      return res.status(502).json({ error: "Falha ao consultar pagamento", details: payment });
    }

    console.log("[INFO] Pagamento retornado:", payment);

    const {
      status,
      payer: {
        email: payerEmail = "não informado",
        first_name = "",
        last_name = "",
      } = {},
      external_reference = "não informado",
      metadata = {},
    } = payment;

    const payerName = `${first_name} ${last_name}`.trim() || "não informado";

    let buyerFriends = [];
    if (metadata.buyer_friends) {
      try {
        const parsed = JSON.parse(metadata.buyer_friends);
        if (Array.isArray(parsed)) buyerFriends = parsed;
      } catch {
        console.warn("[WARN] buyer_friends inválido");
      }
    }

    const now = new Date();

    try {
      const db = (await clientPromise).db();
      await db.collection("pagamentos").updateOne(
        { paymentId },
        {
          $set: {
            status,
            payerEmail,
            payerName,
            externalReference,
            metadata,
            updatedAt: now,
          },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true }
      );
      console.log("[INFO] Pagamento salvo no MongoDB");
    } catch (err) {
      console.error("[ERROR] MongoDB:", err);
    }

    if (status === "approved") {
      const textEmail = `
💰 Novo pagamento aprovado!

ID do pagamento: ${paymentId}
Status: ${status}
Nome do pagador: ${payerName}
E-mail do pagador: ${payerEmail}
External Reference: ${external_reference}

Amigos: ${buyerFriends.join(", ") || "nenhum"}
      `.trim();

      try {
        await transporter.sendMail({
          from: `"Stigween" <${process.env.SMTP_USER}>`,
          to: process.env.CONFIRMATION_EMAIL_TO,
          subject: `Pagamento aprovado - ${payerName}`,
          text: textEmail,
        });
        console.log("[INFO] E-mail enviado");
      } catch (err) {
        console.error("[ERROR] E-mail:", err);
      }

      try {
        const sheetsRes = await fetch(process.env.SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: payerName,
            email: payerEmail,
            externalReference: external_reference,
            friends: buyerFriends,
            paymentDate: now.toISOString(),
          }),
        });

        if (!sheetsRes.ok) {
          const errText = await sheetsRes.text();
          console.error("[ERROR] Google Sheets:", errText);
        } else {
          console.log("[INFO] Dados enviados ao Google Sheets");
        }
      } catch (err) {
        console.error("[ERROR] Google Sheets fetch:", err);
      }
    } else {
      console.log("[INFO] Status não aprovado:", status);
    }

    return res.status(200).json({ message: "Processado", status });
  } catch (err) {
    console.error("[ERROR] Geral:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
