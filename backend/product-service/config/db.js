const { Sequelize } = require('sequelize');

const dbUrl = process.env.DB_URL || 'postgres://user:password@product-db:5432/product_service';

if (!dbUrl) {
    console.error('La variable de entorno DB_URL no está definida');
    process.exit(1);
}

const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: true,
});

sequelize.authenticate()
    .then(() => console.log('product-db: DB Connected'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize;
