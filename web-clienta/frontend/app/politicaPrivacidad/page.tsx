import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-container">
          <p className="services-hero-subtitle">INFORMACIÓN LEGAL</p>
          <h1 className="services-hero-title">
            Política de <em>Privacidad</em>
          </h1>
          <p className="services-hero-description">
            Tu privacidad y protección de datos es importante para nosotros
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="linaje-calling">
        <div className="container">
          <div className="calling-content">
            <h2 className="calling-title">Protección de tus datos personales</h2>
            <div className="calling-text">
              <p>
                En La Voz de mi Linaje, nos tomamos muy en serio la protección de tu privacidad y el tratamiento 
                responsable de tus datos personales. Esta política de privacidad explica cómo recopilamos, utilizamos, 
                almacenamos y protegemos tu información personal.
              </p>
              
              <blockquote className="highlight-quote">
                <p>
                  Cumplimos con el Reglamento General de Protección de Datos (RGPD) y toda la normativa vigente 
                  en materia de protección de datos personales.
                </p>
              </blockquote>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Responsable del tratamiento
              </h3>
              
              <p>
                <strong>Identidad:</strong> La Voz de mi Linaje - María R. García<br />
                <strong>Finalidad:</strong> Gestionar tu solicitud de información, reservas de sesiones y talleres, 
                y mantenerte informado sobre nuestros servicios.<br />
                <strong>Legitimación:</strong> Consentimiento del interesado y ejecución de un contrato.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                ¿Qué datos recopilamos?
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Información que nos proporcionas directamente
                </h4>
                <p>
                  Cuando te pones en contacto con nosotros o reservas una sesión, podemos recopilar:
                </p>
                <ul className="service-features">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Información relevante para la sesión o consulta</li>
                  <li>Cualquier otra información que decidas compartir voluntariamente</li>
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b6f47' }}>
                  Información recopilada automáticamente
                </h4>
                <p>
                  Cuando visitas nuestro sitio web, podemos recopilar automáticamente:
                </p>
                <ul className="service-features">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares (ver nuestra <Link href="/cookies" style={{ color: '#8b6f47', textDecoration: 'underline' }}>Política de Cookies</Link>)</li>
                </ul>
              </div>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                ¿Cómo utilizamos tus datos?
              </h3>
              
              <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
              
              <ul className="service-features" style={{ marginBottom: '2rem' }}>
                <li><strong>Gestión de servicios:</strong> Procesar reservas, consultas y solicitudes de información</li>
                <li><strong>Comunicación:</strong> Responder a tus preguntas y mantener el contacto contigo</li>
                <li><strong>Mejora del servicio:</strong> Analizar el uso del sitio web para mejorar la experiencia del usuario</li>
                <li><strong>Información relevante:</strong> Enviarte información sobre talleres, sesiones y contenido de valor (solo si has dado tu consentimiento)</li>
                <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y fiscales</li>
              </ul>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Base legal para el tratamiento
              </h3>
              
              <p>
                El tratamiento de tus datos personales se basa en:
              </p>
              <ul className="service-features">
                <li><strong>Consentimiento:</strong> Has aceptado voluntariamente el tratamiento de tus datos</li>
                <li><strong>Ejecución de contrato:</strong> Es necesario para prestarte el servicio solicitado</li>
                <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y comunicarnos contigo</li>
                <li><strong>Obligación legal:</strong> Cumplimiento de normativas fiscales y legales</li>
              </ul>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                ¿Con quién compartimos tus datos?
              </h3>
              
              <p>
                No vendemos ni alquilamos tu información personal a terceros. Solo compartimos tus datos con:
              </p>
              <ul className="service-features">
                <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar el sitio web (hosting, email, pagos)</li>
                <li><strong>Obligaciones legales:</strong> Cuando sea requerido por ley o autoridades competentes</li>
              </ul>
              
              <p style={{ marginTop: '1rem' }}>
                Todos nuestros proveedores cumplen con el RGPD y tienen la obligación contractual de proteger tus datos.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                ¿Cuánto tiempo conservamos tus datos?
              </h3>
              
              <p>
                Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades descritas, 
                salvo que la ley requiera o permita un período de conservación más largo. Cuando tus datos ya no sean 
                necesarios, los eliminaremos de forma segura.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Tus derechos
              </h3>
              
              <p>
                De acuerdo con el RGPD, tienes derecho a:
              </p>
              <ul className="service-features">
                <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos ("derecho al olvido")</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento de tus datos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado y de uso común</li>
                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos en determinadas circunstancias</li>
                <li><strong>No ser objeto de decisiones automatizadas:</strong> No ser objeto de decisiones basadas únicamente en tratamiento automatizado</li>
              </ul>

              <p style={{ marginTop: '1.5rem' }}>
                Para ejercer cualquiera de estos derechos, puedes contactarnos a través de nuestro 
                <Link href="/contacta" style={{ color: '#8b6f47', textDecoration: 'underline' }}> formulario de contacto</Link>.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Seguridad de los datos
              </h3>
              
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales 
                contra acceso no autorizado, pérdida, destrucción o alteración. Esto incluye:
              </p>
              <ul className="service-features">
                <li>Cifrado SSL/TLS para transmisiones de datos</li>
                <li>Acceso restringido a datos personales</li>
                <li>Copias de seguridad regulares</li>
                <li>Formación del personal en protección de datos</li>
              </ul>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Menores de edad
              </h3>
              
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionadamente información 
                personal de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado datos personales, 
                por favor contáctanos.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Cambios en esta política
              </h3>
              
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio 
                significativo publicando la nueva política en esta página y actualizando la fecha de "última actualización". 
                Te recomendamos revisar esta política periódicamente.
              </p>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Contacto
              </h3>
              
              <p>
                Si tienes preguntas, inquietudes o deseas ejercer tus derechos relacionados con esta política de privacidad, 
                puedes contactarnos a través de:
              </p>
              <ul className="service-features">
                <li>Formulario de contacto en nuestra web</li>
                <li>Correo electrónico (disponible en la sección de contacto)</li>
              </ul>

              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#6b6b6b' }}>
                Última actualización: Febrero 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Tienes dudas sobre tu privacidad?</h2>
            <p className="cta-description">
              Si tienes alguna pregunta sobre cómo protegemos tus datos o sobre tus derechos, 
              no dudes en contactarnos. Tu confianza es lo más importante para nosotros.
            </p>
            <div className="cta-buttons">
              <Link href="/contacta" className="btn btn-primary">CONTACTAR →</Link>
              <Link href="/cookies" className="btn btn-secondary">VER POLÍTICA DE COOKIES</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
