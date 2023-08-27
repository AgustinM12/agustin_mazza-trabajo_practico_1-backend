const router = require('express').Router();

const {
    createUser, findUsers
} = require('../controllers/user.controllers')

const {validateUser}= require('../validators/user.validation')

// Traer usuarios
router.get('/find-all-users', findUsers);

// Crear un usuario
router.post('/register-user',validateUser, createUser);
// {
//     "user_name": "nombre_de_usuario",
//     "user_email": "correo@example.com",
//     "user_password": "contraseña_segura"
//   }
  

module.exports = router