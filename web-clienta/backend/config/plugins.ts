import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

export default config;

module.exports = ({ env }) => ({
    // ... si ya tenías otras cosas aquí, déjalas y añade esto debajo:
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_USERNAME'),
          defaultReplyTo: env('SMTP_USERNAME'),
        },
      },
    },
  });