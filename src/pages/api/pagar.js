const handlePagamento = async () => {
  try {
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Ingresso Stigween', quantity: 1, price: 50 }),
    });
    const data = await res.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert('Erro ao gerar pagamento');
    }
  } catch {
    alert('Erro ao conectar com o servidor');
  }
};
