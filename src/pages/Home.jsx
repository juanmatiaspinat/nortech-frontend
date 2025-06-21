import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { FaMobileAlt, FaTools, FaHeadphones, FaHandshake } from 'react-icons/fa';

function Home() {
    return (
        <div className={styles.homeContainer}>
            {/* SECCION HERO*/}
            <header className={styles.heroSection}>
                <div className={styles.heroOverlay}></div> {/* Capa para oscurecer la imagen y que el texto resalte */}
                <div className={styles.heroText}>
                    <h1>¡Bienvenidos a NorTech!</h1>
                    <p className={styles.subtitle}>
                        Tu mundo tecnológico, a un solo clic de distancia.
                    </p>
                    <Link to="/Catalogo" className={styles.ctaButton}>
                        Explorar Catálogo
                    </Link>
                </div>
            </header>

            {/* SECCIÓN DE CARACTERISTICAS/SERVICIOS */}
            <section className={styles.featuresSection}>
                <h2>¿Qué te ofrecemos en NorTech?</h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <FaMobileAlt className={styles.icon} />
                        <h3>Smartphones de Vanguardia</h3>
                        <p>Amplia variedad de celulares de última generación de las mejores marcas.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <FaHeadphones className={styles.icon} />
                        <h3>Accesorios de Calidad</h3>
                        <p>Encontrá fundas, cargadores, auriculares y todo lo que necesitás para tu equipo.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <FaHandshake className={styles.icon} />
                        <h3>Asesoramiento Personalizado</h3>
                        <p>Te ayudamos a elegir el equipo perfecto para vos, según tus gustos y necesidades.</p>
                    </div>
                </div>
            </section>

             {/* SECCION DE CIERRE */}
             <section className={styles.closingSection}>
                <h2>Comprometidos con vos</h2>
                <p>
                    En NorTech creemos que la tecnología debe mejorar tu vida. Por eso nos comprometemos a brindarte excelentes precios, atención personalizada y servicio postventa confiable.
                    <br/><br/>
                    <strong>¡Gracias por confiar en nosotros! Tu próximo celular te está esperando.</strong>
                </p>
             </section>
        </div>
    );
}

export default Home;
