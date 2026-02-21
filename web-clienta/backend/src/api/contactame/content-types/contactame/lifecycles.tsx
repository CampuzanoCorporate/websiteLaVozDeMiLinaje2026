export default {
  async afterUpdate(event) {
    const { result } = event;

    // 1. Comprobamos si la administradora ha escrito una respuesta 
    // Y si el email NO se ha enviado todavía (para evitar bucles)
    if (result.Respuesta && result.EmailEnviado === false) {
      try {
        // 2. Usamos el servicio de Email interno de Strapi
        await strapi.plugin('email').service('email').send({
          to: result.Email, // El email que el cliente dejó en el formulario
          from: 'no-reply@lavozdemilinaje.com', // El email de tu clienta
          subject: `Respuesta a tu consulta en La Voz de mi Linaje`,
          text: result.Respuesta, // La respuesta en texto plano
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h2>Hola ${result.Nombre},</h2>
              <p>Gracias por contactar con La Voz de mi Linaje. Aquí tienes la respuesta a tu consulta:</p>
              <blockquote style="border-left: 4px solid #4F46E5; padding-left: 15px; margin-left: 0; font-style: italic;">
                ${result.Respuesta}
              </blockquote>
              <p>Un abrazo,<br>María R. García</p>
            </div>
          `,
        });

        // 3. Marcamos la casilla "EmailEnviado" a TRUE en la base de datos
        // Así sabemos que ya se ha contestado y no se vuelve a enviar si edita otra cosa
        await strapi.entityService.update('api::contactame.contactame', result.id, {
          data: {
            EmailEnviado: true,
            Leido: true // Ya que respondemos, lo marcamos como leído automáticamente
          },
        });

        console.log("✅ Email enviado con éxito a:", result.Email);

      } catch (error) {
        console.error("❌ Error al enviar el email:", error);
      }
    }
  },
};