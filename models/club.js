module.exports = (sequelize, DataTypes) => {
    const Club = sequelize.define('Club', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clubName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });
    return Club;
  };
  