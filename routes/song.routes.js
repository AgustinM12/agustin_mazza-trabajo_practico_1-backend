const router = require('express').Router();

const { validateSong } = require('../validators/song.validation')

const {
    createSong,
    findSongs
} = require('../controllers/song.controllers')

// Traer todas las canciones
router.get('/find-all-songs', findSongs);

// Crear una cancion
router.post('/register-song', validateSong, createSong);
// {
//     "song_name": "cancion GOD",
//         "artist": "MESSI"
// }


module.exports = router