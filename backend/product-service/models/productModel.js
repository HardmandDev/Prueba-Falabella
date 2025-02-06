const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    store_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sold_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Almacena URLs de imágenes
        allowNull: true
    },
    specifications: {
        type: DataTypes.JSON, // Para almacenar especificaciones en formato clave-valor
        allowNull: true
    },
    additional_info: {
        type: DataTypes.TEXT, // Para ficha técnica y garantía
        allowNull: true
    }
});

sequelize.sync(); // 🚨 Asegúrate de solo ejecutar esto en desarrollo para evitar problemas en producción

module.exports = Product;
