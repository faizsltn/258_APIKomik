module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nama_genre: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Genre;
  };