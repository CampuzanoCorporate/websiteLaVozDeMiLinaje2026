import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AvisoLegal() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-container">
            <p className="contact-hero-subtitle">INFORMACIÓN LEGAL</p>
            <h1 className="contact-hero-title">Aviso Legal</h1>
            <p className="contact-hero-description">
              Información sobre la titularidad y uso de este sitio web conforme a la normativa española vigente
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="services-catalog" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
              
              {/* Identificación del titular */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  1. Identificación del Titular
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos del titular del sitio web:
                </p>
                <ul style={{ listStyle: 'none', padding: '1.5rem', backgroundColor: 'var(--bg-beige)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>Denominación social:</strong> La Voz de Mi Linaje
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>Titular:</strong> Rosa María Gracia
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>NIF/CIF:</strong> [Pendiente de completar]
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>Domicilio:</strong> [Dirección completa]
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>Correo electrónico:</strong> info@lavozdemilinage.es
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <strong>Sitio web:</strong> www.lavozdemilinage.es
                  </li>
                </ul>
              </div>

              {/* Objeto */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  2. Objeto
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  El presente aviso legal regula el uso y utilización del sitio web <strong>www.lavozdemilinage.es</strong>, del que es titular Rosa María Gracia.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, así como de la <Link href="/politicaPrivacidad" style={{ color: 'var(--primary-green)', textDecoration: 'underline' }}>Política de Privacidad</Link> y la <Link href="/cookies" style={{ color: 'var(--primary-green)', textDecoration: 'underline' }}>Política de Cookies</Link>.
                </p>
              </div>

              {/* Condiciones de uso */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  3. Condiciones de Uso
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos a través del sitio web y a no emplearlos para:
                </p>
                <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Difundir contenidos delictivos, violentos, pornográficos, racistas, xenófobos, ofensivos, de apología del terrorismo o que atenten contra los derechos humanos.
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Provocar daños en los sistemas físicos y lógicos del titular, de sus proveedores o de terceros.
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Introducir o difundir virus informáticos o cualesquiera otros sistemas que sean susceptibles de provocar daños.
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Intentar acceder, utilizar y/o manipular los datos del titular, terceros proveedores y otros usuarios.
                  </li>
                </ul>
              </div>

              {/* Propiedad intelectual */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  4. Propiedad Intelectual e Industrial
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  Todos los contenidos del sitio web, entendiendo por estos a título meramente enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Rosa María Gracia o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual sobre los mismos.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Las marcas, nombres comerciales o signos distintivos son titularidad de Rosa María Gracia o terceros, sin que pueda entenderse que el acceso al sitio web atribuya derecho alguno sobre las citadas marcas, nombres comerciales y/o signos distintivos.
                </p>
              </div>

              {/* Exclusión de garantías */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  5. Exclusión de Garantías y Responsabilidad
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo:
                </p>
                <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Errores u omisiones en los contenidos.
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Falta de disponibilidad del sitio web o la transmisión de virus o programas maliciosos.
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Ausencia de veracidad, exactitud, exhaustividad y/o actualidad de los contenidos.
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    La presencia de virus u otros elementos lesivos en los contenidos que puedan producir alteraciones en los sistemas informáticos, documentos electrónicos o datos de los usuarios.
                  </li>
                </ul>
              </div>

              {/* Enlaces */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  6. Enlaces (Links)
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, el titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso el titular asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
                </p>
              </div>

              {/* Derecho de exclusión */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  7. Derecho de Exclusión
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  El titular se reserva el derecho a denegar o retirar el acceso al sitio web y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
                </p>
              </div>

              {/* Modificaciones */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  8. Modificaciones
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  El titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que estos aparezcan presentados o localizados.
                </p>
              </div>

              {/* Legislación aplicable */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                  9. Legislación Aplicable y Jurisdicción
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  La relación entre el titular y el usuario se regirá por la normativa española vigente, en particular:
                </p>
                <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)
                  </li>
                  <li style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    Real Decreto Legislativo 1/1996, de 12 de abril, por el que se aprueba el texto refundido de la Ley de Propiedad Intelectual
                  </li>
                </ul>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
                  Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, sometiéndose las partes a los Juzgados y Tribunales que correspondan conforme a derecho.
                </p>
              </div>

              {/* Fecha actualización */}
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-beige)', borderRadius: '8px', borderLeft: '4px solid var(--primary-green)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', margin: 0 }}>
                  <strong>Última actualización:</strong> Enero de 2026
                </p>
              </div>

            </div>

            {/* CTA Section */}
            <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: 'var(--white)', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
                ¿Tienes alguna duda?
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-light)', marginBottom: '2rem', lineHeight: '1.8' }}>
                Si necesitas más información sobre nuestros términos legales, no dudes en contactarnos
              </p>
              <Link href="/contacta" className="btn btn-primary">
                CONTACTAR
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
