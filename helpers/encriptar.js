const bcrypt = require('bcryptjs'); //PARA ENCRIPTAR


//ENCRIPTA LA PASSWORD
const encriptar = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
     return hash
}

//ENCRIPTA LA PASSWORD PLANA CON EL HASH
const comparar = async (contraseñaPlana, hashContraseña) => {
    return await bcrypt.compare(contraseñaPlana, hashContraseña)
}

module.exports = {  
    encriptar,
    comparar
}