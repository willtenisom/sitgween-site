export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>🐈 Stigween</h1>
    </header>
  );
}

const styles = {
  header: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderBottom: '2px solid #ff7518',
  },
  logo: {
    fontSize: '2rem',
    color: '#ff7518',
    margin: 0,
  },
};
