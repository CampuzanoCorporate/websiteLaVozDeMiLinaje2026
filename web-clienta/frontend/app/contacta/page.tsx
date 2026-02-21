"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactaPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    privacidad: false,
  });

  const [faqAbierto, setFaqAbierto] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("http://localhost:1337/api/contactames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Nombre: formData.nombre,
            Apellidos: formData.apellidos,
            Email: formData.email,
            Telefono: formData.telefono,
            Asunto: formData.asunto,
            Mensaje: formData.mensaje,
            Leido: false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSubmitStatus({
        type: "success",
        message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
      });

      // Resetear el formulario
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
        privacidad: false,
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const toggleFaq = (index: number) => {
    setFaqAbierto(faqAbierto === index ? null : index);
  };

  const faqs = [
    {
      pregunta: "¿Cómo funcionan las sesiones online?",
      respuesta:
        "Las sesiones online se realizan a través de videollamada (Zoom o Google Meet). Necesitarás una conexión estable a internet, un espacio privado y tranquilo donde puedas estar cómodo/a durante la sesión. Te enviaré el enlace de la reunión 24 horas antes de nuestra cita programada.",
    },
    {
      pregunta: "¿Cuánto dura una sesión?",
      respuesta:
        "Las sesiones individuales tienen una duración de 90 minutos. Los talleres grupales pueden variar entre 2-3 horas dependiendo del formato. El Programa de Sanación Profunda incluye sesiones de 90 minutos distribuidas a lo largo de 3 meses.",
    },
    {
      pregunta: "¿Qué métodos de pago aceptas?",
      respuesta:
        "Acepto transferencias bancarias, PayPal y tarjetas de crédito/débito. Para programas de sanación profunda, ofrezco planes de pago flexibles. El pago debe realizarse antes de la sesión programada.",
    },
  ];

  return (
    <>
      <Header />

      {/* Contact Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <p className="contact-hero-subtitle">INICIA TU VIAJE</p>
          <h1 className="contact-hero-title">Contacto</h1>
          <p className="contact-hero-description">
            Estoy aquí para acompañarte. Si tienes dudas sobre los servicios o
            deseas agendar una sesión personalizada, escríbeme. Tu sanación
            comienza con este primer paso.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="main-contact-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            {submitStatus.type && (
              <div
                className={`alert alert-${submitStatus.type}`}
                style={{
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                  backgroundColor: submitStatus.type === "success" ? "#d4edda" : "#f8d7da",
                  color: submitStatus.type === "success" ? "#155724" : "#721c24",
                  border: `1px solid ${submitStatus.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                }}
              >
                {submitStatus.message}
              </div>
            )}

            <form className="contact-form-main" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">NOMBRE</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellidos">APELLIDOS</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Tus apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">TELÉFONO</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="+34 000 000 000"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="asunto">ASUNTO</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Información General">Información General</option>
                  <option value="Sesión Individual">Sesión Individual</option>
                  <option value="Taller Grupal">Taller Grupal</option>
                  <option value="Programa de Sanación Profunda">
                    Programa de Sanación Profunda
                  </option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">MENSAJE</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={6}
                  placeholder="¿En qué puedo ayudarte hoy?"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="privacidad"
                    name="privacidad"
                    checked={formData.privacidad}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                  <span>
                    He leído y acepto la{" "}
                    <Link href="/politica-privacidad">
                      política de privacidad
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ marginLeft: "8px" }}
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Contact Information Sidebar */}
          <div className="contact-info-sidebar">
            <div className="contact-info-card">
              <h3 className="contact-info-title">Información de Contacto</h3>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">ESCRÍBEME</p>
                  <p className="contact-info-value">hola@lavozdemilinaje.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">UBICACIÓN</p>
                  <p className="contact-info-value">Almería, España</p>
                  <p className="contact-info-sublabel">
                    Disponibilidad Online Global
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info-label">HORARIO</p>
                  <p className="contact-info-value">Lun - Vie: 10:00 - 19:00</p>
                </div>
              </div>

              <div className="contact-social-section">
                <p className="contact-social-label">SÍGUEME EN REDES</p>
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

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">Preguntas Frecuentes</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.pregunta}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="faq-icon"
                    style={{
                      transform: faqAbierto === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {faqAbierto === index && (
                  <div className="faq-answer">
                    <p>{faq.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
