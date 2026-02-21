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
                  <p className="contact-info-value">Madrid, España</p>
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
                  <a href="#" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
