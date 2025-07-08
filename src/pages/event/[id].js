import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Link from 'next/link';

const eventos = [
  { id: 1, title: 'Baile de Máscaras Fantasma', date: '31/10', price: 100 },
  { id: 2, title: 'Noite dos Gatos Negros', date: '30/10', price: 80 },
  { id: 3, title: 'Festival das Sombras', date: '29/10', price: 120 },
];

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;

  const evento = eventos.find((e) => e.id === parseInt(id));

  if (!evento) {
    return (
      <div>
        <Header />
        <main style={styles.main}>
          <h2 style={styles.title}>Evento não encontrado</h2>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main style={styles.main}>
        <h2 style={styles.title}>{evento.title}</h2>
        <p style={styles.text}>Data: {evento.date}</p>
        <p style={styles.text}>Preço: R$ {evento.price}</p>
        <Link
          href="/checkout"
          style={styles.button}
          onClick={() => {
            localStorage.setItem(
              'evento',
              JSON.stringify({
                title: evento.title,
                quantity: 1,
                price: evento.price,
              })
            );
          }}
        >
          Comprar Ingresso
        </Link>
      </main>
    </div>
  );
}

const styles = {
  main: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#ff7518',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    margin: '5px',
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    backgroundColor: '#ff7518',
    color: '#121212',
    padding: '10px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
  },
};
