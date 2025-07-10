import { useEffect, useState } from "react";
import styles from "../styles/Morcego.module.css";

export default function Morcego() {
  const [bats, setBats] = useState(
    Array.from({ length: 2 }, () => ({
      id: Math.random(),
      top: `${Math.random() * 90}vh`,
      left: `${Math.random() * 90}vw`,
      visible: false,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBats((oldBats) =>
        oldBats.map((bat) => ({
          ...bat,
          visible: Math.random() < 0.4 ? true : false,
          top: `${Math.random() * 90}vh`,
          left: `${Math.random() * 90}vw`,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bats.map((bat) => (
        <img
          key={bat.id}
          src="/bat.png"
          alt=""
          aria-hidden="true"
          className={`${styles.bat} ${bat.visible ? styles.visible : ""}`}
          style={{ top: bat.top, left: bat.left }}
        />
      ))}
    </>
  );
}
