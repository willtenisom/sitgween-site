import mercadopago from 'mercadopago';

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { title, quantity, price } = req.body;

  if (!title || !quantity || !price) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title,
          quantity,
          currency_id: 'BRL',
          unit_price: parseFloat(price),
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pending`,
      },
      auto_return: 'approved',
    });

    res.status(200).json({ init_point: preference.body.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
}
