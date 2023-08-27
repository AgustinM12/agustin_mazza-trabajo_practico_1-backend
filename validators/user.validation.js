const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validate")

const validateUser = [
check("user_name")
.matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre debe ser alfanumerico"),

check("user_email")
.isEmail().withMessage("Ingrese un email valido"),


check("user_password")
.isAlphanumeric().withMessage("La contraseña debe ser alfanumerica")
.isLength({ min: 5, max: 15 }).withMessage('La contraseña debe tener entre 5 y 12 caracteres'),

(req, res, next) =>{
    validateSchema(req, res, next)
}
]

module.exports = { validateUser }