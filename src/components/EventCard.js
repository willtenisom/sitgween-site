import { useState } from 'react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Produto Teste',
          quantity: 1,
          price: 100.0,
          name: 'Cliente Teste',
          email: 'cliente@teste.com',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona o cliente para o checkout do MercadoPago
        window.location.href = data.init_point;
      } else {
        console.error('Erro ao criar preferência', data.error);
        alert('Erro: ' + data.error);
      }
    } catch (err) {
      console.error('Erro na requisição', err);
      alert('Erro inesperado');
    }

    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Carregando...' : 'Pagar com MercadoPago'}
    </button>
  );
}
