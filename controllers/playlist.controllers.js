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

// MOSTRAR UNA PLAYLIST
ctrlPlaylist.findOnePlaylist = async (req, res) => {
    const id_playlist = req.params.id_playlist; // Obtener el ID de la playlist de los parámetros de la solicitud

    try {
        const playlist = await Playlist.findByPk(id_playlist); // Buscar la playlist por su ID

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist no encontrada"
            });
        }

        return res.json(playlist);

    } catch (error) {
        console.log('Error al obtener la playlist', error);
        return res.status(500).json({
            message: "Error del servidor al obtener la playlist"
        });
    }
}


//ACTUALIZAR UNA PLAYLIST
ctrlPlaylist.updatePlaylist = async (req, res) => {
    const id_playlist = req.params.id_playlist; // Obtener el ID de la playlist de los parámetros de la solicitud
    const updatedData = req.body; // Obtener los datos actualizados de la playlist del cuerpo de la solicitud

    try {
        const playlist = await Playlist.findByPk(id_playlist); // Buscar la playlist por su ID

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist no encontrada"
            });
        }

        // Actualizar los datos de la playlist
        await playlist.update(updatedData);

        return res.json({
            message: "Playlist actualizada exitosamente"
        });

    } catch (error) {
        console.log('Error al actualizar la playlist', error);
        return res.status(500).json({
            message: "Error del servidor al actualizar la playlist"
        });
    }
}



//ELIMINAR UNA PLAYLIST
ctrlPlaylist.deletePlaylist = async (req, res) => {
    const id_playlist = req.params.id_playlist; // Obtener el ID de la playlist de los parámetros de la solicitud

    try {
        const playlist = await Playlist.findByPk(id_playlist); // Buscar la playlist por su ID

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist no encontrada"
            });
        }

        await playlist.destroy();

        return res.json({
            message: "Playlist eliminada exitosamente"
        });

    } catch (error) {
        console.log('Error al eliminar la playlist', error);
        return res.status(500).json({
            message: "Error del servidor al eliminar la playlist"
        });
    }
}


//CREAR PLAYLIST
ctrlPlaylist.createPlaylist = async (req, res) => {

    try {
        const { playlist_name, song_ids, user_id } = req.body;

        // Se verifica si la playlist ya existe
        const existPlaylist = await Playlist.findOne({
            where: {
                playlist_name
            }
        });


        if (existPlaylist) {
            return res.status(409).json({
                message: '¡La playlist ya esta registrada!',
            });
        } else {

            //CREA CANCION EN LA DB
            const playlist = new Playlist({
                playlist_name,
                song_ids,
                user_id
            });

            await playlist.save();

            return res.status(201).json({
                message: "Playlist creada exitosamente"
            })
        }

    } catch (error) {
        console.log('Error al crear la playlist', error)

        return res.status(500).json({
            message: 'Error del servidor al crear la playlist'
        })
    }
}

module.exports = ctrlPlaylist;