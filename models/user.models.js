const { DataTypes, sequelize } = require("../db")
const bcrypt = require('bcrypt');

//MODELO DE USUARIO
const User = sequelize.define("user", {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    paranoid: false,
    tableName: "User"
});

User.sync({ force: false }).then(async () => {
    console.log('Tabla de usuarios creada')

    // Verificar si ya existen registros en la tabla
    const count = await User.count();
    if (count === 0) {
        // Crear los registros de canciones después de crear la tabla
        try {

            let user_password = 'password123'
            //ENCRIPTAR LA PASSWORD
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(user_password, salt)

            await User.bulkCreate([
                { user_name: 'Usuario#1', user_email: 'User1@example.com', user_password: hashedPass, playlist_id: 1 },
            ])

            console.log('registros de canciones creados exitosamente');
        } catch (error) {
            console.error('Error al crear los registros de canciones', error);
        }
    }

})

module.exports = User;