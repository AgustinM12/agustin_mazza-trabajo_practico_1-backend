const router = require('express').Router();

const { validatePlaylist } = require('../validators/playlist.validation')

const {
    createPlaylist,
    findPlaylists,
    findOnePlaylist,
    updatePlaylist,
    deletePlaylist,
    cargarCanciones
} = require('../controllers/playlist.controllers')

// Traer TODAS las playlist
router.get('/find-all-playlists', findPlaylists);

//Traer UNA playlist
router.get('/find-one-playlist/:id_playlist', findOnePlaylist);

//Actualizar una playlist
router.get('/update-playlist/:id_playlist', updatePlaylist);

//Eliminar una playlist
router.get('/delete-playlist/:id_playlist', deletePlaylist);

// Crear una playlist
router.post('/register-playlist', validatePlaylist, createPlaylist);

//Cargar canciones a la playlist
router.put('/charge-song', cargarCanciones);

module.exports = router