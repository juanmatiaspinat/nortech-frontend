import React from "react";
//import fondoCelulares from "../assets/fondoCelulares.jpg";
import styles from "../styles/Home.module.css";

function Home() {
    return (
        <div className={styles.mainContainer}>
            
            <div className={styles.heroText}>
                <h1
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold" }}
                >
                    ¡Bienvenidos a NorTech!
                </h1>
                <p style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    En NorTech nos apasiona la tecnología y trabajamos cada día para
                    acercártela de la mejor manera. Somos especialistas en venta de
                    celulares de última generación, accesorios tecnológicos y servicio
                    técnico de confianza.
                </p>
                <h2
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold" }}
                >
                    Ofrecemos:
                </h2>
                <ul className={styles.list}>
                    <li style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        📱 Amplia variedad de smartphones de las mejores marcas.
                    </li>
                    <li style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        🛠️ Servicio técnico especializado para reparaciones rápidas y
                        garantizadas.
                    </li>
                    <li style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        🔌 Accesorios originales y de alta calidad: fundas, cargadores,
                        auriculares y más.
                    </li>
                    <li style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        🤝 Asesoramiento personalizado para que elijas el equipo perfecto
                        para vos.
                    </li>
                </ul>
                <p style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    En NorTech creemos que la tecnología debe mejorar tu vida. Por eso nos
                    comprometemos a brindarte excelentes precios, atención personalizada y
                    servicio postventa confiable.
                </p>
                <p style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    ¡Gracias por confiar en nosotros! Tu próximo celular te está esperando
                    en NorTech.
                </p>
            </div>
        </div>
    );
}

export default Home;
