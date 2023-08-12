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
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false
    }
  });

  Club.associate = function(models) {
    Club.belongsToMany(models.Event, {
      through: models.ClubEvent,
      foreignKey: 'clubId',
      as: 'events',
    });
  };

  return Club;
};
