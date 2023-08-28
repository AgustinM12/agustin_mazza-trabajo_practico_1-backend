//IMPORTAR LOS MODELOS DE LAS TABLAS DE LA BASE DE DATOS
const { sequelize } = require('../db');
const User = require('../models/user.models');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Playlist = require('../models/playlist.models');

const ctrlUser = {}

ctrlUser.createUser = async (req, res) => {

    try {
        const { user_name, user_email, user_password } = req.body;

        // Se verifica si el usuario e email ya existen
        const userNameExistente = await User.findOne({
            where: {
                user_name
            }
        });

        const emailExistente = await User.findOne({
            where: {
                user_email
            }
        });

        if (emailExistente) {
            return res.status(409).json({
                message: '¡El email ya esta registrado!',
            });
        } else {
            if (userNameExistente) {
                return res.status(409).json({
                    message: '¡El nombre de usuario ya esta registrado!',
                });
            }


            //ENCRIPTAR LA PASSWORD
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(user_password, salt)

            //CREA USUARIO EN LA DB
            const user = new User({
                user_name,
                user_email,
                user_password: hashedPass
            });

            await user.save();

            return res.status(201).json({
                message: "Usuario creado exitosamente"
            })
        }

    } catch (error) {
        console.log('Error al crear el usuario', error)

        return res.status(500).json({
            message: 'Error del servidor al crear el usuario'
        })
    }
}

// MOSTRAR TODOS LOS USUARIOS
ctrlUser.findUsers = async (req, res) => {

    try {
        const users = await User.findAll({include: {model:Playlist}});

        return res.json(users);

    } catch (error) {
        console.log('Error al obtener los usuarios', error)
        return res.status(500).json({
            message: "Error del servidor al obtener usuarios"
        })
    }
}

module.exports = ctrlUser;