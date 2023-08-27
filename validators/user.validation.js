const { check } = require("express-validator")
const { validateSchema } = require("../helpers/validateHealper")

const validateCreate = [
check("nombre")
.isAlpha().withMessage("El nombre debe ser alfabetico"),

check("apellido")
.isAlpha().withMessage("El apellido debe ser alfabetico"),


check("dni")
.isNumeric().withMessage("El dni debe ser numerico")
.isLength({ min: 8, max: 8 }).withMessage('El dni debe tener 8 caracteres'),

check("telefono")
.isLength({ min: 10, max: 12 }).withMessage('El telefono debe tener mas de 10 caracteres y menos de 12')
.isNumeric().withMessage("El telefono debe ser numerico"),

check("fecha_salida")
.custom(value => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (currentDate > selectedDate) {
      throw new Error('La fecha salida ser igual o posterior al día actual');
    }
    return true;
  }),

check("fecha_llegada")
.custom(value => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (currentDate > selectedDate) {
      throw new Error('La fecha llegada ser igual o posterior al día actual');
    }
    return true;
  }),

check("costo")
.custom((value) => {
  if (value < 1000) {
    throw new Error('El valor debe ser mayor a 1000');
  }
  return true;
})
.isNumeric().withMessage("El costo debe ser un valor numerico"),

(req, res, next) =>{
    validateSchema(req, res, next)
}
]

module.exports = { validateCreate }