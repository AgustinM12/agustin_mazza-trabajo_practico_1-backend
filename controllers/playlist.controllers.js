//IMPORTAR LOS MODELOS DE LAS TABLAS DE LA BASE DE DATOS
const { sequelize } = require('../db');
const Playlist = require('../models/playlist.models');
const Song = require('../models/song.models');
const User = require('../models/user.models');

const { Op, where } = require('sequelize');
const ctrlPlaylist = {}

//#MOSTRAR TODAS LAS PLAYLISTS
ctrlPlaylist.findPlaylists = async (req, res) => {

    try {
        const playlists = await Playlist.findAll({ include: { model: Song } });

        return res.json(playlists);

    } catch (error) {
        console.log('Error al obtener las playlsit', error)
        return res.status(500).json({
            message: "Error del servidor al obtener las playlist"
        })
    }
}

//#MOSTRAR UNA PLAYLIST
ctrlPlaylist.findOnePlaylist = async (req, res) => {
    const id_playlist = req.params.id_playlist; // Obtener el ID de la playlist de los parámetros de la solicitud

    try {
        const playlist = await Playlist.findByPk(id_playlist, { include: { model: Song } }); // Buscar la playlist por su ID

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


//#ACTUALIZAR UNA PLAYLIST(ELIMINAR CANCIONES)
ctrlPlaylist.updatePlaylist = async (req, res) => {

    try {
        const { id_song, id_playlist } = req.body;

        const existPlaylist = await Playlist.findOne({
            where: {
                id_playlist
            }
        });

        const existSong = await Song.findOne({
            where: {
                id_song
            }
        })

        if (!existSong) {
            return res.status(404).json({
                message: 'La canción elegida no existe'
            })
        }


        if (!existPlaylist) {
            return res.status(404).json({
                message: 'La playlist elegida no existe'
            })
        } else {

            const deleteSongs = await Song.update({
                id_playlist: null
            },
                { where: { id_song } })

            return res.status(201).json({
                message: "Canciones eliminadas de la playlist exitosamente"
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({ message: error.message || "Error del seridor al actualizar las canciones de la playlist" })
    }
}

//#ELIMINAR UNA PLAYLIST
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


//#CREAR PLAYLIST
ctrlPlaylist.createPlaylist = async (req, res) => {
    try {
        const { playlist_name, id_user } = req.body;

        // Se verifica si la playlist ya existe
        const existPlaylist = await Playlist.findOne({
            where: {
                playlist_name
            }
        });

        //Se verifica si el usuario existe
        const existUser = User.findOne({
            where: {
                id_user
            }
        });

        if(!existUser){
            return res.status(404).json({
                message: 'No existe un usuario con ese id'
            });
        }

        if (existPlaylist) {
            return res.status(409).json({
                message: 'Ya hay una playlist registrada con ese nombre',
            });
            
        } 
            // Crea la playlist en la DB
            await Playlist.create({
                playlist_name,
                id_user,
            });

            return res.status(201).json({
                message: "Playlist creada exitosamente"
            });
        
    } catch (error) {
        console.log('Error al crear la playlist', error);
        return res.status(error.status || 500).json({ message: error.message || "Error del servidor al crear la playlist" })
    }
}

//#CARGAR CANCIONES EN LA PLAYLIST
ctrlPlaylist.cargarCanciones = async (req, res) => {
    try {
        const { id_song, id_playlist } = req.body;

        //SE VERIFICA QUE LA CANCION YA NO SE ENCUENTRE EN OTRA PLAYLIST
        const cancionOcupada = await Song.findOne({
            where: {
                id_playlist
            }
        });

        //SE VERIFICA QUE LA PLAYLIST EXISTA
        const existIdPlaylist = await Playlist.findOne({
            where: {
                id_playlist
            }
        });

        //SE VERIFICA QUE LA CANCION EXISTA
        const existIdSong = await Song.findOne({
            where: {
                id_song
            }
        });

        if (!existIdSong) {
            return res.status(409).json({
                message: 'La cancion elegida no existe'
            })
        }

        if (!existIdPlaylist) {
            return res.status(409).json({
                message: 'La playlist elegida no existe'
            })
        }

        if (cancionOcupada !== null) {
            return res.status(409).json({
                message: 'La cancion ya esta ocupada en otra playlist'
            })

            //SI NO SE PRODUCEN ERRORES SE SIGUE CON LA ACTUALIZACION DE LA PLAYLIST
        } else {

            const songs = await Song.update({
                id_playlist: id_playlist
            },
                { where: { id_song } })

            return res.status(201).json({
                message: "Playlist actualizada exitosamente"
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({ message: error.message || "Error del servidor al actualizar las canciones de la playlist" })
    }
}

module.exports = ctrlPlaylist;