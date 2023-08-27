const { DataTypes, sequelize } = require('../db');
const User = require('./user.models');
const Song = require('./song.models')

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
    song_ids: {
        type: DataTypes.JSON,
        allowNull: true, // Puedes establecer un valor por defecto como un arreglo vacío
    }
}, {
    timestamps: false,
    paranoid: false,
    tableName: "playlist"
});

// Relaciones
Playlist.belongsTo(User, { foreignKey: "user_id" });
Playlist.hasMany(Song, { foreignKey: "playlist_id" }); // Relación uno a muchos entre Playlist y Song

Playlist.sync({ force: false }).then(async () => {
    console.log('Tabla de playlist creada');

    const count = await Playlist.count();
    if (count === 0) {
        try {
            const defaultPlaylist = await Playlist.create({
                playlist_name: 'Playlist#1',
                user_id: 1
            });

            const defaultSongIds = [1, 6, 12]; // IDs de las canciones
            defaultPlaylist.song_ids = defaultSongIds; // Asigna los IDs de las canciones al campo song_ids
            await defaultPlaylist.save();

            console.log('Registro de playlist creado exitosamente');
        } catch (error) {
            console.error('Error al crear el registro de playlist', error);
        }
    }
});

module.exports = Playlist;
