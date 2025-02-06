const { Sequelize } = require('sequelize');

const dbUrl = process.env.DB_URL || 'postgres://user:password@auth-db:5432/auth_service';

if (!dbUrl) {
    console.error('La variable de entorno DB_URL no está definida');
    process.exit(1); // Salir si la variable no está definida
}

const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: true,
});

sequelize.authenticate()
    .then(() => console.log('auth-db: DB Connected'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize;
