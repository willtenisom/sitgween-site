import { useState } from 'react';

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Ingresso Evento X',
        quantity: 1,
        price: 100,
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert('Erro ao criar pagamento.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Checkout</h1>
      <button onClick={handlePay} disabled={loading}>
        {loading ? 'Processando...' : 'Pagar com Mercado Pago'}
      </button>
    </div>
  );
}
