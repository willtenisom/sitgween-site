import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const pupils = document.querySelectorAll(".pupil");

    function handleMouseMove(e) {
      const { clientX, clientY } = e;
      const maxOffset = 8;

      pupils.forEach((pupil) => {
        const eye = pupil.parentElement;
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        let offsetX = clientX - eyeCenterX;
        let offsetY = clientY - eyeCenterY;

        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        if (distance > maxOffset) {
          const ratio = maxOffset / distance;
          offsetX *= ratio;
          offsetY *= ratio;
        }

        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Head>
        <title>Stigween</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header>
        <img
          src="/stigween-banner.jpg"
          alt="Stigween Banner"
          className="banner"
        />
      </header>

      <div className="overlay">
        <div className="blood-drop drop1"></div>
        <div className="blood-drop drop2"></div>
        <div className="blood-drop drop3"></div>
        <div className="blood-drop drop4"></div>
        <div className="blood-drop drop5"></div>
        <div className="blood-drop drop6"></div>
        <div className="blood-drop drop7"></div>
        <div className="blood-drop drop8"></div>

        <main>
          <section>
            <div className="evento-box">
              <div className="ear left-ear"></div>
              <div className="ear right-ear"></div>

              <div className="eye left-eye">
                <div className="pupil"></div>
                <div className="eye-reflection"></div>
              </div>
              <div className="eye right-eye">
                <div className="pupil"></div>
                <div className="eye-reflection"></div>
              </div>

              <div className="whiskers whiskers-left">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="whiskers whiskers-right">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="nose"></div>

              <h2>🕸️ Grande Evento Stigween</h2>
              <p>
                Venda começa em: <strong>10/10</strong>
              </p>
              <p>
                Data do evento: <strong>01/11</strong>
              </p>

              <div
                className="ingresso"
                onClick={() => {
                  const audio = new Audio("/cat-meow.mp3");
                  audio.play();
                }}
              >
                <div className="text-wrapper">
                  <h3>🎟️ Ingresso Promocional</h3>
                  <div className="ticket-card">
                    <p className="ticket-price">R$ 50</p>
                    <p className="promo-end">Promoção termina em 24/07</p>
                  </div>
                </div>
                <div className="mouth-image"></div>
                <div className="blood-drip"></div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: url("/background.jpg") center/cover no-repeat fixed;
          position: relative;
          font-family: "Creepster", cursive;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          overflow-x: hidden;
        }

        header {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          background-color: rgba(0, 0, 0, 0.4);
          position: relative;
          z-index: 10;
        }

        .banner {
          max-width: 902px;
          width: 100%;
          height: auto;
          opacity: 0.7;
        }

        .overlay {
          position: relative;
          width: 100%;
          padding: 20px 0 60px 0;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          z-index: 5;
        }

        /* Sangue caindo */
        .blood-drop {
          position: fixed;
          top: -20px;
          width: 12px;
          height: 12px;
          background: linear-gradient(180deg, #ff0000cc, #880000cc);
          border-radius: 50%;
          box-shadow: 0 0 15px #ff0000cc;
          opacity: 0.8;
          animation: drip 3s linear infinite;
          z-index: 3;
        }

        .drop1 {
          left: 10%;
          animation-delay: 0s;
        }
        .drop2 {
          left: 20%;
          animation-delay: 0.7s;
        }
        .drop3 {
          left: 35%;
          animation-delay: 1.4s;
        }
        .drop4 {
          left: 50%;
          animation-delay: 2.1s;
        }
        .drop5 {
          left: 60%;
          animation-delay: 1.0s;
        }
        .drop6 {
          left: 70%;
          animation-delay: 2.7s;
        }
        .drop7 {
          left: 80%;
          animation-delay: 0.4s;
        }
        .drop8 {
          left: 90%;
          animation-delay: 1.8s;
        }

        @keyframes drip {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          80% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0.3;
          }
          100% {
            transform: translateY(110vh) scale(0);
            opacity: 0;
          }
        }

        main {
          text-align: center;
          width: 100%;
          font-size: 28px;
        }

        .evento-box {
          max-width: 600px;
          margin: 90px auto 0 auto;
          background: rgba(26, 26, 26, 0.7);
          padding: 90px 60px;
          position: relative;
          border: 5px solid #ff7518;
          color: #ffb347;
          font-weight: 600;
          border-radius: 40% 40% 45% 45% / 60% 60% 55% 55%;
          box-shadow: 0 0 35px #ff7518, inset 0 0 25px #ff7518;
        }

        .ear {
          position: absolute;
          top: -60px;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #ff7518, #d96d00);
          border: 5px solid #ff7518;
          border-radius: 55% 55% 25% 25% / 65% 65% 35% 35%;
          box-shadow: 0 0 20px #ff7518;
          z-index: 15;
        }

        .left-ear {
          left: 60px;
          transform: rotate(-15deg);
        }
        .right-ear {
          right: 60px;
          transform: rotate(15deg);
        }

        .eye {
          position: absolute;
          top: 40px;
          width: 70px;
          height: 40px;
          background: radial-gradient(circle at 30% 50%, #ff0000, #8b0000);
          border: 3px solid #ff7518;
          border-radius: 50% / 70%;
          box-shadow: 0 0 15px #ff0000;
        }

        .left-eye {
          left: 120px;
        }
        .right-eye {
          right: 120px;
        }

        .pupil {
          position: absolute;
          top: 7px;
          width: 16px;
          height: 26px;
          background: black;
          border-radius: 50% / 70%;
          transition: transform 0.1s linear;
        }

        /* Ajuste bigodes para alinhamento simétrico */
        .whiskers {
          position: absolute;
          top: 90px;
          width: 90px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .whiskers-left {
          left: 15px; /* alinhado um pouco mais para dentro */
          align-items: flex-start;
        }
        .whiskers-right {
          right: 15px; /* alinhado um pouco mais para dentro */
          align-items: flex-end;
        }

        .whiskers span {
          display: block;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #ff7518, #d96d00);
          box-shadow: 0 0 10px #ff7518;
        }

        .nose {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 20px;
          background: linear-gradient(135deg, #d96d00, #ff7518);
          border-radius: 50%;
          border: 4px solid #ff7518;
        }

        /* INGRESSO */
        .ingresso {
          margin-top: 50px;
          background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
          padding: 20px 25px;
          border-radius: 40% / 30%;
          border: 4px solid #ff7518;
          box-shadow: 0 0 25px #ff7518, inset 0 0 15px #ff7518;
          color: #ffb347;
          font-weight: 600;
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          cursor: pointer;
          overflow: visible;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;

          height: 90px;
          transition: height 0.4s ease, border-radius 0.4s ease;
        }

        .ingresso:hover {
          height: 220px;
          border-radius: 20% / 30% 30% 70% 70%;
        }

        .text-wrapper {
          transition: opacity 0.3s ease;
          z-index: 20;
          user-select: none;
          text-align: center;
        }

        .ingresso:hover .text-wrapper {
          opacity: 0;
          pointer-events: none;
        }

        .ingresso h3 {
          margin: 0;
          font-size: 24px;
          line-height: 1.2;
          text-shadow: 0 0 10px #ff7518;
          white-space: nowrap;
        }

        .ticket-card {
          margin: 0;
          padding: 0;
          background: transparent;
          color: #ffb347;
          font-size: 20px;
          user-select: none;
        }

        .ticket-price {
          margin: 0;
          font-weight: 700;
          font-size: 26px;
          text-shadow: 0 0 10px #ff0000;
          white-space: nowrap;
        }

        .promo-end {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #ff5555;
          text-shadow: 0 0 7px #ff0000aa;
          white-space: nowrap;
        }

        /* Imagem boca */
        .mouth-image {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: url("/halloween-cat.jpg") center/cover no-repeat;
          opacity: 0;
          transition: height 0.4s ease, opacity 0.4s ease;
          border-radius: 0 0 70% 70% / 0 0 100% 100%;
          z-index: 10;
          pointer-events: none;
        }

        .ingresso:hover .mouth-image {
          height: 180px;
          opacity: 1;
        }

        /* Sangue escorrendo */
        .blood-drip {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 35px;
          background: linear-gradient(180deg, #ff0000cc, #800000cc);
          border-radius: 50% / 70%;
          box-shadow: 0 0 8px #ff0000cc;
          opacity: 0;
          animation: blood-drip-fall 1.8s ease-in-out infinite;
          z-index: 12;
          pointer-events: none;
        }

        .ingresso:hover .blood-drip {
          opacity: 1;
        }

        @keyframes blood-drip-fall {
          0% {
            transform: translateX(-50%) translateY(0) scaleY(1);
            opacity: 1;
          }
          80% {
            transform: translateX(-50%) translateY(40px) scaleY(1.3);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-50%) translateY(50px) scaleY(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
