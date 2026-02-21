"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConocenosPage() {
  return (
    <>
      <Header />

      {/* Hero About Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-image">
            <Image src="/img/foto1.jpg" alt="María R. García" width={500} height={600} />
          </div>
          <div className="about-hero-content">
            <p className="section-subtitle">MI HISTORIA</p>
            <h1 className="about-hero-title">Caminando entre <em>raíces y alas</em></h1>
            <p className="about-hero-description">Soy María, guardiana de historias y facilitadora de procesos de sanación. Mi propósito es acompañarte a recordar quién eres más allá de lo que te dijeron que debías ser.</p>
          </div>
        </div>
      </section>

      {/* El Llamado del Linaje Section */}
      <section className="linaje-calling">
        <div className="container">
          <div className="calling-content">
            <h2 className="calling-title">El Llamado del Linaje</h2>
            <div className="calling-text">
              <p className="calling-quote">"No salimos para cambiar nuestro pasado, salimos para liberar nuestro futuro."</p>
              
              <p>Desde muy pequeña, sentí una fascinación inexplicable por las historias de mis abuelos. Mientras otros niños jugaban, yo escuchaba atenta los relatos de migraciones, amores perdidos y secretos susurrados en la sobremesa. Sin saberlo, estaba empezando a tejer el hilo que me llevaría a mi vocación.</p>
              
              <p>Mi camino profesional comenzó en el mundo corporativo, un entorno donde el éxito se medía en cifras y resultados inmediatos. Sin embargo, el alma anhelaba una profundidad diferente. Fue en esta crisis personal, un momento en que me di cuenta de que estaba obligada a detenerme y mirar hacia adentro. En ese silencio, a veces es en mi linaje comenzaron a hablar más fuerte.</p>
              
              <blockquote className="highlight-quote">
                <p>Descubrí que lo que yo cargaba como dolor propio, en realidad eran ecos de duelos no resueltos por aquellos que vinieron antes de mí.</p>
              </blockquote>
              
              <p>Me sumergí en el estudio de las Constelaciones Familiares, la Biodescodificación y la Psicogenealogia. No solo como una formación académica sino como un proceso de autosanación visceral. Cada sesión que realizaba en otros liberaba algo en mí. Comprendí que honrar a mis ancestros no significaba repetir sus destinos, sino tomar la vida que me pasaron y hacer algo hermoso con ella.</p>
            </div>
          </div>
          
          <div className="calling-image">
            <Image src="/img/foto1.jpg" alt="María en reflexión" width={400} height={500} />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">PILARES</p>
            <h2 className="section-title">Mi Filosofía de Acompañamiento</h2>
          </div>
          
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Respeto al Ritmo</h3>
              <p>Entiendo la sanación como un proceso gradual, no apurado. Cada historia tiene su ritmo, requiere paciencia y respeto por tus tiempos internos.</p>
            </div>
            
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Mirada Sistémica</h3>
              <p>No somos islas. Te miro a ti, y a través de ti veo tu sistema familiar. Trabajamos para que tu reclamo y el lugar que te corresponde fluya.</p>
            </div>
            
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Empoderamiento</h3>
              <p>Mi objetivo no es que me necesites siempre. Mi intención es acompañarte a que descubras que eres el gestor de tu propio reconstruir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Estás listo para ocupar tu lugar?</h2>
            <p className="cta-description">Si sientes el llamado a sanar tus raíces para desplegar tus alas, estoy aquí para acompañarte. Explora las diferentes formas en las que podemos trabajar juntos.</p>
            <div className="cta-buttons">
              <Link href="/servicios" className="btn btn-primary">VER MIS SERVICIOS →</Link>
              <Link href="/contacto" className="btn btn-secondary">ESCRÍBEME</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">+500</div>
              <div className="stat-label">ALMAS ACOMPAÑADAS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">AÑOS DE EXPERIENCIA</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">TALLERES GRUPALES</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">HISTORIAS SANADAS</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}