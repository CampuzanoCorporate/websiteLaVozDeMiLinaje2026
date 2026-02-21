const path = require('path');

module.exports = ({ env }) => {
  // Configuración para PRODUCCIÓN (Internet - PostgreSQL)
  if (env('NODE_ENV') === 'production') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false
          },
        },
        pool: { min: 2, max: 10 },
      },
    };
  }

  // Configuración para DESARROLLO (Tu ordenador - SQLite)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};