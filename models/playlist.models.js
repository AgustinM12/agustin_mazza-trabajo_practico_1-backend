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
}, {
    timestamps: false,
    paranoid: false,
    tableName: "playlist"
});

// Relaciones
Playlist.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Playlist, {foreignKey: "id_playlist" });

Playlist.sync({ force: false }).then(async () => {
    console.log('Tabla de playlist creada');

});

module.exports = Playlist;
