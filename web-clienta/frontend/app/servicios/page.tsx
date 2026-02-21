import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Función para obtener servicios desde Strapi
async function getServicios() {
  try {
    const res = await fetch('http://localhost:1337/api/servicios?populate=*', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Error al obtener servicios');
    }
    
    const datos = await res.json();
    return datos.data || [];
  } catch (error) {
    console.error('Error fetching servicios:', error);
    return [];
  }
}

// Función para extraer texto de la descripción
function extraerDescripcion(descripcion: any): string {
  if (!descripcion) return '';
  
  if (Array.isArray(descripcion)) {
    return descripcion
      .map((bloque: any) => {
        if (bloque.type === 'paragraph' && bloque.children) {
          return bloque.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .filter((texto: string) => texto.length > 0)
      .join(' ');
  } else if (typeof descripcion === 'string') {
    return descripcion;
  }
  
  return '';
}

export default async function ServiciosPage() {
  const servicios = await getServicios();

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-container">
          <p className="services-hero-subtitle">TU CAMINO ESPIRITUAL</p>
          <h1 className="services-hero-title">
            Nuestros <em>Servicios</em>
          </h1>
          <p className="services-hero-description">
            Descubre las herramientas que te ayudarán a reconectar con tu esencia, 
            sanar tu linaje y transformar tu vida a través de la lectura de registros akáshicos.
          </p>
        </div>
      </section>
      {/* Catálogo de Servicios */}
      <section className="services-catalog">
        <div className="services-catalog-container">
          {servicios.map((servicio: any, index: number) => {
            const titulo = servicio.Titulo || servicio.attributes?.Titulo;
            const descripcion = servicio.Descripcion || servicio.attributes?.Descripcion;
            const precio = servicio.Precio || servicio.attributes?.Precio;
            
            const descripcionTexto = extraerDescripcion(descripcion);
            const isFeatured = index === 1;

            return (
              <div 
                key={servicio.id} 
                className={`service-card-detailed ${isFeatured ? 'featured-service' : ''}`}
              >
                {isFeatured && <span className="service-badge">POPULAR</span>}
                
                <div className="service-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                
                <h3 className="service-card-title">{titulo}</h3>
                <p className="service-card-description">
                  {descripcionTexto || 'Descripción no disponible'}
                </p>
                
                <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  {precio}€
                </p>
                
                <a href="/reservar" className="btn btn-primary service-btn">
                  RESERVAR AHORA →
                </a>
              </div>
            );
          })}
          {servicios.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: '#6b6b6b', fontSize: '1.1rem' }}>
                No hay servicios disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Sección de Mentoría */}
      <section className="mentoria-section">
        <div className="mentoria-container">
          <div>
            <div className="mentoria-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3 className="mentoria-title">Mentoría Personalizada</h3>
            <p className="mentoria-description">
              Si buscas un acompañamiento más profundo y continuo en tu camino espiritual, 
              nuestra mentoría personalizada es para ti. Trabajaremos juntos en sesiones 
              diseñadas específicamente para tus necesidades.
            </p>
            <div className="mentoria-features">
              <div className="mentoria-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Sesiones personalizadas
              </div>
              <div className="mentoria-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Seguimiento continuo
              </div>
              <div className="mentoria-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Material exclusivo
              </div>
              <div className="mentoria-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Soporte prioritario
              </div>
            </div>
          </div>
          
          <div className="mentoria-pricing">
            <p className="mentoria-price-label">INVERSIÓN MENSUAL</p>
            <p className="mentoria-price">XXX€</p>
            <p className="mentoria-price-note">
              El precio se ajusta según tus necesidades específicas. 
              Contáctanos para más información.
            </p>
            <a href="/contactame" className="btn btn-primary mentoria-btn">
              CONSULTAR DISPONIBILIDAD
            </a>
          </div>
        </div>
      </section>
      {/* Services CTA */}
      <section className="services-cta">
        <div className="services-cta-container">
          <div className="services-cta-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 className="services-cta-title">¿Lista para comenzar tu transformación?</h2>
          <p className="services-cta-description">
            Reserva tu sesión ahora y da el primer paso hacia la sanación de tu linaje 
            y el descubrimiento de tu verdadero propósito.
          </p>
          <div className="cta-buttons">
            <a href="/reservar" className="btn btn-primary">RESERVAR CITA</a>
            <a href="/contacta" className="btn btn-secondary">CONOCE MÁS</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}