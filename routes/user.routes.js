const router = require('express').Router();

const {
    createUser, findUsers
} = require('../controllers/user.controllers')

// Traer usuarios
router.get('/find-all', findUsers);

// Crear un usuario
router.post('/register', createUser);
// {
//     "user_name": "nombre_de_usuario",
//     "user_email": "correo@example.com",
//     "user_password": "contraseña_segura"
//   }
  

module.exports = router