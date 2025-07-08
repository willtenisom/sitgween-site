import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="background">
      <div className="overlay">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
