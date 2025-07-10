import { useState } from "react";
import styles from "../styles/Ads.module.css";

export default function Ads() {
  const [openAd, setOpenAd] = useState(null);

  const ads = [
    { src: "/ad1.png", alt: "Anúncio 1" },
    { src: "/ad2.png", alt: "Anúncio 2" },
    { src: "/ad3.png", alt: "Anúncio 3" },
  ];

  return (
    <aside className={styles.adsContainer}>
      <div className={styles.adBox}>
        {ads.map(({ src, alt }) => (
          <div
            key={src}
            className={styles.adItem}
            onClick={() => setOpenAd(src)}
            tabIndex={0}
            role="button"
            aria-label={`Abrir ${alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpenAd(src);
              }
            }}
          >
            <img src={src} alt={alt} />
            <span
              className={styles.adText}
              style={{
                color: "#ff7518", // laranja temático
                fontWeight: "bold",
                textShadow: "1px 1px 3px black",
              }}
            >
              ⚰️ Clique… se ousar! 👻
            </span>
          </div>
        ))}
      </div>

      {openAd && (
        <div
          className={styles.modalOverlay}
          onClick={() => setOpenAd(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de anúncio"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              onClick={() => setOpenAd(null)}
              aria-label="Fechar anúncio"
            >
              ×
            </button>
            <img src={openAd} alt="Anúncio ampliado" />
          </div>
        </div>
      )}
    </aside>
  );
}
