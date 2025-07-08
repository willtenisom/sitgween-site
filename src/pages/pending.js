export default function Pending() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🦇 Pagamento pendente</h1>
      <p style={styles.text}>Estamos aguardando a confirmação do pagamento. Você receberá um e-mail em breve!</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#ff7518',
  },
  text: {
    fontSize: '1.2rem',
  },
};
