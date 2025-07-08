import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  console.log('📬 Webhook recebido:', req.body);

  try {
    const paymentId = req.body.data?.id;

    if (paymentId) {
      const payment = await mercadopago.payment.findById(paymentId);
      console.log('💳 Status do pagamento:', payment.body.status);

      // Aqui você poderia salvar o status no banco
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no webhook');
  }
}
