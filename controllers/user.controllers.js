//IMPORTAR LOS MODELOS DE LAS TABLAS DE LA BASE DE DATOS
const { sequelize } = require('../db');
const User = require('../models/user.models');

const { Op } = require('sequelize');

crearUsuario = async (req, res) => {


    sequelize.transaction(async (transaction) => {
        try {
            const { user_name, user_email, user_password } = req.body;

//CREAR EL USUARIO EN LA DB





        } catch (error) {

            throw error
        }

    })
}
