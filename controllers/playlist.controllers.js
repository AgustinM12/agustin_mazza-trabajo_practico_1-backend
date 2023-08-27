//IMPORTAR LOS MODELOS DE LAS TABLAS DE LA BASE DE DATOS
const { sequelize } = require('../db');
const Playlist = require('../models/playlist.models');

const { Op } = require('sequelize');
const ctrlPlaylist = {}

// MOSTRAR TODAS LAS PLAYLISTS
ctrlPlaylist.findPlaylists = async (req, res) => {

    try {
        const playlists = await Playlist.findAll();

        return res.json(playlists);

    } catch (error) {
        console.log('Error al obtener las playlsit', error)
        return res.status(500).json({
            message: "Error del servidor al obtener las playlist"
        })
    }
}

module.exports = ctrlPlaylist;