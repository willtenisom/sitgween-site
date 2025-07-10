import clientPromise from "../../lib/mongodb";

console.log(process.env.MONGODB_URI)

export default async function handler(req, res) {
  if (req.method !== "GET") {
    console.warn("[WARN] Método não permitido:", req.method);
    return res.status(405).json({ error: "Método não permitido, use GET" });
  }

  const { id } = req.query;
  if (!id) {
    console.error("[ERROR] Payment ID ausente");
    return res.status(400).json({ error: "Payment ID ausente" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("pagamentos");

    console.log(`[INFO] Consultando pagamento ID: ${id} no banco`);

    const payment = await collection.findOne({ paymentId: id });

    if (!payment) {
      console.warn(`[WARN] Pagamento não encontrado no banco: ${id}`);
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    console.error("[ERROR] Erro ao consultar pagamento no banco:", error);
    return res.status(500).json({ error: "Erro interno ao consultar pagamento" });
  }
}
