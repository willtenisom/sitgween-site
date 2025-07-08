export default function Failure() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👻 Algo deu errado!</h1>
      <p style={styles.text}>O pagamento não foi concluído. Tente novamente.</p>
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
