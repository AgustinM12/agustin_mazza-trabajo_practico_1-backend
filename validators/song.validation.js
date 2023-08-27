const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validate")

const validateSong = [
check("song_name")
.matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre de la cancion debe ser alfanumerico"),

check("artist")
.matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre del artista debe ser alfanumerico"),

(req, res, next) =>{
    validateSchema(req, res, next)
}
]

module.exports = { validateSong }