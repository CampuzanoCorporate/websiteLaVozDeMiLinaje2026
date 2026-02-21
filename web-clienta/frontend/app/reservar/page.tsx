"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Servicio {
  id?: number;
  documentId?: string;
  Titulo?: string;
  Descripcion?: string;
  Precio?: number;
  attributes?: {
    Titulo: string;
    Descripcion: string;
    Precio: number;
  };
}

interface Disponibilidad {
  id?: number;
  documentId?: string;
  FechaHora?: string;
  Ocupado?: boolean;
  attributes?: {
    FechaHora: string;
    Ocupado: boolean;
  };
}

export default function ReservarPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [fechasLibres, setFechasLibres] = useState<Disponibilidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Estados para el calendario interactivo
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);
  const [horasDelDia, setHorasDelDia] = useState<Disponibilidad[]>([]);
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    disponibilidadId: "",
    servicioId: "",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resServicios, resDisponibilidad] = await Promise.all([
          fetch("process.env.NEXT_PUBLIC_API_URL/api/servicios"),
          fetch("process.env.NEXT_PUBLIC_API_URL/api/disponibilidads?filters[Ocupado][$eq]=false")
        ]);
        
        const dataServicios = await resServicios.json();
        const dataDisponibilidad = await resDisponibilidad.json();
        
        setServicios(dataServicios.data || []);
        setFechasLibres(dataDisponibilidad.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setMensaje({ 
          tipo: "error", 
          texto: "Error al cargar los datos. Por favor, intenta más tarde." 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para comprobar si un día tiene huecos libres
  const tieneHuecos = (fecha: Date) => {
    const fechaStr = fecha.toLocaleDateString("es-ES");
    return fechasLibres.some((hueco) => {
      const fechaHueco = hueco.FechaHora || hueco.attributes?.FechaHora;
      if (!fechaHueco) return false;
      const huecoStr = new Date(fechaHueco).toLocaleDateString("es-ES");
      return huecoStr === fechaStr;
    });
  };

  // Cuando el usuario hace clic en un día del calendario
  const manejarCambioDeDia = (fecha: any) => {
    setDiaSeleccionado(fecha);
    setFormData({ ...formData, disponibilidadId: "" });
    
    const fechaStr = fecha.toLocaleDateString("es-ES");
    const horasDisponibles = fechasLibres.filter((hueco) => {
      const fechaHueco = hueco.FechaHora || hueco.attributes?.FechaHora;
      if (!fechaHueco) return false;
      const huecoStr = new Date(fechaHueco).toLocaleDateString("es-ES");
      return huecoStr === fechaStr;
    });
    
    horasDisponibles.sort((a, b) => {
      const fechaA = a.FechaHora || a.attributes?.FechaHora;
      const fechaB = b.FechaHora || b.attributes?.FechaHora;
      if (!fechaA || !fechaB) return 0;
      return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    });

    setHorasDelDia(horasDisponibles);
  };

  const obtenerHoraTexto = (fechaISO: string) => {
    return new Date(fechaISO).toLocaleTimeString("es-ES", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      // 1. Crear la reserva
      const resReserva = await fetch("process.env.NEXT_PUBLIC_API_URL/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            NombreCliente: formData.nombre,
            EmailCliente: formData.email,
            EstadoPago: "Pendiente",
            servicio: formData.servicioId,
            disponibilidad: formData.disponibilidadId,
          },
        }),
      });

      if (resReserva.ok) {
        // 2. Marcar el hueco como ocupado
        await fetch(`process.env.NEXT_PUBLIC_API_URL/api/disponibilidads/${formData.disponibilidadId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { Ocupado: true } }),
        });

        setMensaje({ 
          tipo: "exito", 
          texto: "¡Reserva confirmada! Nos pondremos en contacto contigo pronto." 
        });
        
        setFormData({ 
          nombre: "", 
          email: "", 
          telefono: "", 
          disponibilidadId: "", 
          servicioId: "" 
        });
        setDiaSeleccionado(null);
        setHorasDelDia([]);
        
        // Actualizar la lista de fechas libres
        setFechasLibres(fechasLibres.filter(f => {
          const id = (f.documentId || f.id)?.toString();
          return id !== formData.disponibilidadId;
        }));
      } else {
        const errorData = await resReserva.json();
        setMensaje({ 
          tipo: "error", 
          texto: errorData.error?.message || "Error al procesar la reserva." 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje({ 
        tipo: "error", 
        texto: "Error de conexión. Verifica tu conexión a internet." 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
          <Header />
    
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <div className="contact-hero-subtitle">AGENDA TU CITA</div>
          <h1 className="contact-hero-title">
            Reserva tu <em>Sesión</em>
          </h1>
          <p className="contact-hero-description">
            Selecciona un día disponible en el calendario y elige la hora que mejor te convenga
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="main-contact-container">
          {/* Formulario con Calendario */}
          <div className="contact-form-wrapper">
            {mensaje.texto && (
              <div 
                className="alert-message"
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  borderRadius: '4px',
                  backgroundColor: mensaje.tipo === "exito" ? '#d4edda' : '#f8d7da',
                  color: mensaje.tipo === "exito" ? '#155724' : '#721c24',
                  border: `1px solid ${mensaje.tipo === "exito" ? '#c3e6cb' : '#f5c6cb'}`
                }}
              >
                <p style={{ margin: 0, fontWeight: '500', fontSize: '0.95rem' }}>
                  {mensaje.texto}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form-main">
              {/* Paso 1: Calendario */}
              <div className="form-group">
                <label style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  1. Selecciona un día
                </label>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1rem',
                  backgroundColor: '#f5f3f0',
                  borderRadius: '8px'
                }}>
                  <Calendar 
                    onChange={manejarCambioDeDia} 
                    value={diaSeleccionado}
                    locale="es-ES"
                    minDate={new Date()}
                    tileDisabled={({ date, view }) => view === 'month' && !tieneHuecos(date)}
                  />
                </div>
              </div>

              {/* Paso 2: Horas disponibles */}
              {diaSeleccionado && horasDelDia.length > 0 && (
                <div className="form-group">
                  <label style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                    2. Selecciona una hora
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {horasDelDia.map((hueco) => {
                      const id = (hueco.documentId || hueco.id)?.toString();
                      const fechaISO = hueco.FechaHora || hueco.attributes?.FechaHora || "";
                      const estaSeleccionado = formData.disponibilidadId === id;
                      
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setFormData({ ...formData, disponibilidadId: id || "" })}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            border: estaSeleccionado ? '2px solid #7a9b8e' : '1px solid #ddd',
                            backgroundColor: estaSeleccionado ? '#7a9b8e' : '#ffffff',
                            color: estaSeleccionado ? '#ffffff' : '#2c2c2c',
                            cursor: 'pointer'
                          }}
                        >
                          {obtenerHoraTexto(fechaISO)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {diaSeleccionado && horasDelDia.length === 0 && (
                <div className="form-group">
                  <p style={{ 
                    color: '#6b6b6b', 
                    textAlign: 'center',
                    padding: '1rem',
                    backgroundColor: '#f5f3f0',
                    borderRadius: '4px'
                  }}>
                    No hay horas disponibles para este día
                  </p>
                </div>
              )}

              {/* Paso 3: Datos del cliente */}
              {formData.disponibilidadId && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                      3. Tus datos
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Servicio *</label>
                    {loading ? (
                      <div style={{
                        padding: '0.9rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9',
                        color: '#6b6b6b'
                      }}>
                        Cargando servicios...
                      </div>
                    ) : (
                      <select 
                        required
                        value={formData.servicioId}
                        onChange={(e) => setFormData({...formData, servicioId: e.target.value})}
                      >
                        <option value="">Selecciona un servicio</option>
                        {servicios.map((servicio) => {
                          const id = (servicio.id?.toString() || servicio.documentId) || "";
                          const titulo = servicio.Titulo || servicio.attributes?.Titulo || "Sin título";
                          const precio = servicio.Precio || servicio.attributes?.Precio;
                          return (
                            <option key={id} value={id}>
                              {titulo} {precio ? `- $${precio}` : ""}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre Completo *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>Correo Electrónico *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Teléfono (Opcional)</label>
                    <input 
                      type="tel"
                      placeholder="+52 123 456 7890"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={submitting || loading || !formData.servicioId}
                    className="btn btn-primary btn-submit"
                  >
                    {submitting ? 'PROCESANDO...' : 'CONFIRMAR RESERVA'}
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="contact-info-sidebar">
            <div className="contact-info-card">
              <h2 className="contact-info-title">Información</h2>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">HORARIO</div>
                  <div className="contact-info-value">Lunes - Viernes</div>
                  <div className="contact-info-sublabel">9:00 AM - 6:00 PM</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">EMAIL</div>
                  <div className="contact-info-value">contacto@lavozdemilinage.com</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">TELÉFONO</div>
                  <div className="contact-info-value">+34 623 61 96 83</div>
                </div>
              </div>

              <div className="contact-social-section">
                <div className="contact-social-label">SÍGUENOS</div>
                <div className="contact-social-links">
                <a href="https://www.instagram.com/la_voz_de_mi_linaje?igsh=MWFzcTRoeTJwNHBwYQ==" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@La_Voz_de_Mi_Linaje" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@r.maria_garcia_psiquica?is_from_webapp=1&sender_device=pc" aria-label="TikTok">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="#" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            <Footer />
      
    </>
  );
}