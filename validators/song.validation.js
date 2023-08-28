const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validate")

const validateSong = [
    check("song_name")
        .matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre de la cancion debe ser alfanumerico")
        .isLength({ max: 12 }).withMessage("El nombre de la playlist no puede tener más de 12 caracteres"),

    check("artist")
        .matches(/^[a-zA-Z0-9\s']+$/).withMessage("El nombre del artista debe ser alfanumerico")
        .isLength({ max: 12 }).withMessage("El nombre del artista no puede tener más de 12 caracteres"),


    (req, res, next) => {
        validateSchema(req, res, next)
    }
]

module.exports = { validateSong }