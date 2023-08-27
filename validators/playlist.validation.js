const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validate")

const validatePlaylist = [
check("playlist_name")
.matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre de la playlist debe ser alfanumerico"),

(req, res, next) =>{
    validateSchema(req, res, next)
}
]

module.exports = { validatePlaylist }