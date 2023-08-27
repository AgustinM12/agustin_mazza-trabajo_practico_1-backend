const { DataTypes, sequelize } = require("../db.js")

//MODELO DE USUARIO
const Song = sequelize.define("Song", {
    id_song: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    song_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    in_use: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    paranoid: false,
    tableName: "Song"
});

Song.sync({ force: false }).then(async () => {
    console.log('Tabla de canciones creada')
    // Verificar si ya existen registros en la tabla
    const count = await Song.count();
    if (count === 0) {
        // Crear los registros de canciones después de crear la tabla
        try {
            await Song.bulkCreate([
                { song_name: 'Master of Puppets', artist: 'Metallica' },
                { song_name: 'Californication', artist: 'Red Hot Chili Peppers' },
                { song_name: 'Chop Suey!', artist: 'System of a Down' },
                { song_name: 'Hotel California', artist: 'Eagles' },
                { song_name: 'In the End', artist: 'Linkin Park' },
                { song_name: 'Bones', artist: 'Imagine Dragons' },
                { song_name: 'Enter Sandman', artist: 'Metallica' },
                { song_name: 'Dirty Deeds Done Dirt Cheap', artist: 'AC/DC' },
                { song_name: 'Killer Queen', artist: 'Queen' },
                { song_name: 'Eye of the Tiger', artist: 'Survivor' },
                { song_name: 'Welcome to the Jungle', artist: 'Guns N\' Roses' },
                { song_name: 'Otherside', artist: 'Red Hot Chili Peppers' },
                { song_name: 'Pain', artist: 'Three Days Grace' },
                { song_name: 'It\'s My Life', artist: 'Bon Jovi' },
                { song_name: '10th Man Down', artist: 'Nightwish' },
                { song_name: 'Iron Man', artist: 'Black Sabbath' },
                { song_name: 'Crazy Train', artist: 'Ozzy Osbourne' },
                { song_name: 'Back in Black', artist: 'AC/DC' },
                { song_name: 'Dream On', artist: 'Aerosmith' },
                { song_name: 'T.N.T', artist: 'AC/DC' },
                { song_name: 'You give Love a Bad Name', artist: 'Bon Jovi' },
                { song_name: 'Love Gun', artist: 'KISS' },
                { song_name: 'Painkiller', artist: 'Judas Priest' },
            ])

            console.log('registros de canciones creados exitosamente');
        } catch (error) {
            console.error('Error al crear los registros de canciones', error);
        }
    }

})

module.exports = Song;