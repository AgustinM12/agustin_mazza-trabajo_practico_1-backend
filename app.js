const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

// El método config de dotenv permite leer variables de entorno desde un archivo .env
require('dotenv').config();

const { conectarDB } = require('./db'); 
conectarDB();

//MODELOS
const User = require("./models/user.models")
const Song = require("./models/canciones.models")

//DECLARACION DEL PUERTO
const port = process.env.PORT || 5000
// INICIALIZACION DE EXPRESS
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//RUTAS

//LEVANTAR EL SERVIDOR
app.listen(port, () => {
    console.log(`SERVIDOR EJECUTANDOSE EN EL PUERTO: localhost:${port}`);
});