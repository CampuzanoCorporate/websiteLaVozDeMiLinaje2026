import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-container">
          <p className="services-hero-subtitle">INFORMACIÓN LEGAL</p>
          <h1 className="services-hero-title">
            Política de <em>Cookies</em>
          </h1>
          <p className="services-hero-description">
            Información sobre el uso de cookies en nuestro sitio web
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="linaje-calling">
        <div className="container">
          <div className="calling-content">
            <h2 className="calling-title">¿Qué son las cookies?</h2>
            <div className="calling-text">
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
                Estas cookies ayudan a mejorar tu experiencia de navegación, recordar tus preferencias y permitir que 
                el sitio funcione correctamente.
              </p>
              
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Tipos de cookies que utilizamos
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Cookies estrictamente necesarias
                </h4>
                <p>
                  Estas cookies son esenciales para el funcionamiento del sitio web. Sin ellas, algunas funcionalidades 
                  básicas no estarían disponibles. Incluyen cookies de sesión y seguridad.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Cookies de rendimiento
                </h4>
                <p>
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio, recopilando información 
                  de forma anónima. Esto nos permite mejorar el rendimiento y la experiencia del usuario.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Cookies de funcionalidad
                </h4>
                <p>
                  Permiten que el sitio recuerde tus elecciones (como tu idioma preferido o región) y proporcionan 
                  características mejoradas y más personalizadas.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Cookies de análisis
                </h4>
                <p>
                  Utilizamos herramientas como Google Analytics para comprender mejor cómo se utiliza nuestro sitio 
                  y mejorar la experiencia del usuario. Estas cookies recopilan información de manera anónima.
                </p>
              </div>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                ¿Cómo puedes gestionar las cookies?
              </h3>
              
              <p>
                Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están 
                en tu dispositivo y configurar la mayoría de los navegadores para evitar que se almacenen. Sin embargo, 
                si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites 
                un sitio y que algunos servicios y funcionalidades no funcionen correctamente.
              </p>

              <blockquote className="highlight-quote">
                <p>
                  Para obtener más información sobre cómo administrar cookies en los navegadores más comunes, 
                  puedes visitar las páginas de ayuda de cada navegador.
                </p>
              </blockquote>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Navegadores principales
              </h3>
              
              <ul className="service-features" style={{ marginBottom: '2rem' }}>
                <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                <li><strong>Microsoft Edge:</strong> Configuración → Privacidad y servicios → Cookies</li>
              </ul>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Cookies de terceros
              </h3>
              
              <p>
                En algunas ocasiones, utilizamos cookies proporcionadas por terceros de confianza. Estas cookies 
                pueden incluir herramientas de análisis o servicios de redes sociales integrados. No controlamos 
                estas cookies, por lo que te recomendamos revisar las políticas de privacidad de estos terceros.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Actualización de esta política
              </h3>
              
              <p>
                Esta política de cookies puede actualizarse ocasionalmente. Te recomendamos revisarla periódicamente 
                para estar informado sobre cómo utilizamos las cookies.
              </p>

              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#6b6b6b' }}>
                Última actualización: Enero 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Tienes dudas sobre nuestra política de cookies?</h2>
            <p className="cta-description">
              Si tienes alguna pregunta sobre cómo utilizamos las cookies o sobre tu privacidad, 
              no dudes en contactarnos. Estamos aquí para ayudarte.
            </p>
            <div className="cta-buttons">
              <Link href="/contacta" className="btn btn-primary">CONTACTAR →</Link>
              <Link href="/politicaPrivacidad" className="btn btn-secondary">VER POLÍTICA DE PRIVACIDAD</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
