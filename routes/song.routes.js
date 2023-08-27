const router = require('express').Router();

const {
    createSong,
    findSongs
} = require('../controllers/song.controllers')

// Traer canciones
router.get('/find-all-songs', findSongs);

// Crear un usuario
router.post('/register-song', createSong);
// {
//     "song_name": "cancion GOD",
//         "artist": "MESSI"
// }


module.exports = router