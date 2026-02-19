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
          fetch("http://localhost:1337/api/servicios"),
          fetch("http://localhost:1337/api/disponibilidads?filters[Ocupado][$eq]=false")
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
      const resReserva = await fetch("http://localhost:1337/api/reservas", {
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
        await fetch(`http://localhost:1337/api/disponibilidads/${formData.disponibilidadId}`, {
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
                  <div className="contact-info-value">+52 123 456 7890</div>
                </div>
              </div>

              <div className="contact-social-section">
                <div className="contact-social-label">SÍGUENOS</div>
                <div className="contact-social-links">
                  <a href="#" aria-label="Facebook">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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