// SE TRAE LA LIBRERIA SEQUELIZE OPCION 2 FACIL
const { Sequelize, DataTypes } = require('sequelize');
// Se crea una instancia de la conexión a la base de datos

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

// SE PRUEBA LA CONEXION A LA DB
const conectarDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexion exitosa a la DB');
    } catch (error) {
        console.log('ERROR AL CONECTAR A LA DB: ', error);
    }
};

module.exports = {
    sequelize,
    DataTypes,
    conectarDB
};