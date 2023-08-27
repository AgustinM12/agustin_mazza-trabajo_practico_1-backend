//IMPORTAR LOS MODELOS DE LAS TABLAS DE LA BASE DE DATOS
const { sequelize } = require('../db');
const Song = require('../models/song.models');

const { Op } = require('sequelize');
const ctrlSong = {}

ctrlSong.createSong = async (req, res) => {

    try {
        const { song_name, artist } = req.body;

        // Se verifica si la cancion ya existen
        const existSong = await Song.findOne({
            where: {
                song_name
            }
        });


        if (existSong) {
            return res.status(409).json({
                message: '¡La cancion ya esta registrada!',
            });
        } else {

            //CREA CANCION EN LA DB
            const song = new Song({
                song_name,
                artist,
            });

            await song.save();

            return res.status(201).json({
                message: "Cancion creada exitosamente"
            })
        }

    } catch (error) {
        console.log('Error al crear la cancion', error)

        return res.status(500).json({
            message: 'Error del servidor al crear la cancion'
        })
    }
}

// MOSTRAR TODAS LAS CANCIONES
ctrlSong.findSongs = async (req, res) => {

    try {
        const songs = await Song.findAll();

        return res.json(songs);

    } catch (error) {
        console.log('Error al obtener las canciones', error)
        return res.status(500).json({
            message: "Error del servidor al obtener las canciones"
        })
    }
}

module.exports = ctrlSong;