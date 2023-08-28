const { DataTypes, sequelize } = require('../db');
const User = require('./user.models');

const Playlist = sequelize.define('playlist', {
    id_playlist: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playlist_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    paranoid: false,
    tableName: "playlist"
});

// Relaciones
Playlist.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Playlist, { foreignKey: "id_user" });

Playlist.sync({ force: false }).then(async () => {
    console.log('Tabla de playlist creada');


    //  Verificar si ya existen registros en la tabla
    const count = await Playlist.count();
    if (count === 0) {
        // Crear los registros de canciones después de crear la tabla
        try {

            await Playlist.bulkCreate([
                { playlist_name: 'Playlist#1', id_user: 1 },
            ])

            console.log('registro de playlist creado exitosamente');
        } catch (error) {
            console.error('Error al crear el registro de playlist', error);
        }
    }
});

module.exports = Playlist;
