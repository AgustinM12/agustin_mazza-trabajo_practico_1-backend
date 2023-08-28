const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validate")

const validatePlaylist = [
check("playlist_name")
.matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre de la playlist debe ser alfanumerico")
.isLength({max: 20}).withMessage("El nombre de la playlist no puede tener mas de 15 caracteres"),

(req, res, next) =>{
    validateSchema(req, res, next)
}
]

module.exports = { validatePlaylist }