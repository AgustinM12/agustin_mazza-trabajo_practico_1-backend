const router = require('express').Router();

const {
    findPlaylists
} = require('../controllers/playlist.controllers')

// Traer usuarios
router.get('/find-all-playlist', findPlaylists);

// Crear un usuario
// router.post('/register', createUser);
// {
//     "user_name": "nombre_de_usuario",
//     "user_email": "correo@example.com",
//     "user_password": "contraseña_segura"
//   }


module.exports = router