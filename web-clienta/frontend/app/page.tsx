import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Función para obtener servicios desde Strapi
async function getServicios() {
  try {
    const res = await fetch('process.env.NEXT_PUBLIC_API_URL/api/servicios?populate=*', {
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

export default async function HomePage() {
  const servicios = await getServicios();
  
  // Limitar a máximo 3 servicios para la página de inicio
  const serviciosMostrados = servicios.slice(0, 3);

  return (
    <>
    <Header />
      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-subtitle">SANACIÓN Y CRECIMIENTO</p>
            <h1 className="hero-title">La Voz de <em>mi Linaje</em></h1>
            <p className="hero-description">
              Reconecta con tus raíces, sana tu historia y descubre el poder que reside en tu ancestralidad. 
              Un espacio sagrado para la evolución personal.
            </p>
            <div className="hero-buttons">
              <Link href="/servicios" className="btn btn-primary">DESCUBRIR SERVICIOS</Link>
              <Link href="/conocenos" className="btn btn-secondary">CONOCER A MARÍA</Link>
            </div>
          </div>
          <div className="hero-image">
            <Image 
              src="/img/foto1.jpg" 
              alt="María Rosa Gracia" 
              width={450}
              height={450}
              className="profile-image"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <svg className="quote-icon" width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
            <path d="M10 18.5c1.5 0 2.7.5 3.5 1.5.8.9 1.5 2.1 1.5 3.5s-.5 2.7-1.5 3.5c-.9.8-2.1 1.5-3.5 1.5s-2.7-.5-3.5-1.5c-.8-.9-1.5-2.1-1.5-3.5 0-3.5 2.5-7 7-10.5v4c-1 .8-1.5 1.8-1.5 2.5zm20 0c1.5 0 2.7.5 3.5 1.5.8.9 1.5 2.1 1.5 3.5s-.5 2.7-1.5 3.5c-.9.8-2.1 1.5-3.5 1.5s-2.7-.5-3.5-1.5c-.8-.9-1.5-2.1-1.5-3.5 0-3.5 2.5-7 7-10.5v4c-1 .8-1.5 1.8-1.5 2.5z"/>
          </svg>
          <blockquote>
            "Un árbol sin raíces no puede sostener sus ramas hacia el cielo. Sanar el pasado es liberar el futuro."
          </blockquote>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">OFRENDAS</p>
            <h2 className="section-title">Mis Servicios</h2>
            <p className="section-description">
              Acompañamiento personal para sanar tu historia y construir un futuro sin condicionamientos.
            </p>
          </div>
          <div className="services-grid">
            {serviciosMostrados.length > 0 ? (
              serviciosMostrados.map((servicio: any, index: number) => {
                const titulo = servicio.Titulo || servicio.attributes?.Titulo;
                const descripcion = servicio.Descripcion || servicio.attributes?.Descripcion;
                const precio = servicio.Precio || servicio.attributes?.Precio;
                const caracteristicas = servicio.Caracteristicas || servicio.attributes?.Caracteristicas || [];
                
                const descripcionTexto = extraerDescripcion(descripcion);
                const isFeatured = index === 1;

                return (
                  <div 
                    key={servicio.id} 
                    className={`service-card ${isFeatured ? 'featured' : ''}`}
                  >
                    <h3>{titulo}</h3>
                    <p>{descripcionTexto || 'Descripción no disponible'}</p>
                    
                    {caracteristicas.length > 0 && (
                      <ul className="service-features">
                        {caracteristicas.slice(0, 3).map((caracteristica: any, idx: number) => (
                          <li key={idx}>
                            {typeof caracteristica === 'string' 
                              ? caracteristica 
                              : caracteristica.texto || caracteristica.text || ''}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {isFeatured && precio && (
                      <div className="service-price" style={{ margin: '1rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {precio}€
                      </div>
                    )}
                    
                    {isFeatured ? (
                      <a href="#contacto" className="btn btn-primary">RESERVAR PROGRAMA</a>
                    ) : (
                      <a href="#contacto" className="btn-link">RESERVAR SESIÓN</a>
                    )}
                  </div>
                );
              })
            ) : (
              // Fallback: mostrar servicios estáticos si no hay datos
              <>
                <div className="service-card">
                  <h3>Constelaciones Familiares</h3>
                  <p>
                    Sesiones individuales para identificar y sanar patrones transgeneracionales que limitan tu crecimiento. 
                    Encuentra tu lugar en el sistema.
                  </p>
                  <ul className="service-features">
                    <li>Sesiones Individuales</li>
                    <li>Online o Presencial</li>
                  </ul>
                  <a href="#contacto" className="btn-link">RESERVAR SESIÓN</a>
                </div>
                
                <div className="service-card featured">
                  <h3>Terapia Transgeneracional</h3>
                  <p>
                    Un viaje profundo al árbol de tu genealógica. Descifra tus secretos y patrones ocultos que 
                    condicionan tu existencia.
                  </p>
                  <ul className="service-features">
                    <li>Pack de 4 sesiones</li>
                    <li>Online o Presencial</li>
                    <li>Análisis de Árbol</li>
                  </ul>
                  <a href="#contacto" className="btn btn-primary">RESERVAR PROGRAMA</a>
                </div>
                
                <div className="service-card">
                  <h3>Círculos de Mujeres</h3>
                  <p>
                    Espacios de conexión y sanación colectiva compartida donde honrar nuestras historias, conectar con 
                    nuestra sabiduría interior y la fuerza materna.
                  </p>
                  <ul className="service-features">
                    <li>Sesiones Mensuales</li>
                    <li>Grupos reducidos</li>
                  </ul>
                  <a href="#contacto" className="btn-link">VER PRÓXIMAS FECHAS</a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="about">
        <div className="about-container">
          <div className="about-content">
            <p className="section-subtitle">MI CAMINO</p>
            <h2 className="section-title">Hola, soy María</h2>
            <p>
              Mi vida hacia "La Voz de mi Linaje" comenzó con una búsqueda personal de respuestas. Durante años, 
              sentí que cargaba con cosas que no me pertenecían, heridas y patrones que me limitaban.
            </p>
            <p>
              Mi experiencia en Terapia Sistémica y Descodificación Biológica me permitió comprender el lenguaje 
              del alma familiar. Y hoy dedico mi vida a acompañar a otras personas en su propio camino de reconexión, 
              sanación con su historia y plenitud.
            </p>
            <p>
              Creo profundamente que sanar una historia de familia no es sobre culpar a nadie o reparar el pasado, 
              se trata de mirar con amor lo que fue, comprenderlo y permitir que nuestros ancestros descansen.
            </p>
            <p>
              Así, recién entonces, podrás escribir tu propia historia desde tu presente consciente y sin ataduras 
              con el pasado familiar.
            </p>
          </div>
          <div className="about-images">
            <div className="about-img-placeholder about-img-small-placeholder">
              <p>Imagen decorativa</p>
            </div>
            <div className="about-img-placeholder about-img-large-placeholder">
              <p>María en meditación</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  );
}