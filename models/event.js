module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Active', 'Cancelled'),
      allowNull: false
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Event.associate = function(models) {
    Event.belongsToMany(models.Club, {
      through: models.ClubEvent,
      foreignKey: 'eventId',
      as: 'clubs'
    });
    Event.belongsToMany(models.User, {
      through: models.UserEvent,
      foreignKey: 'eventId',
      as: 'users'
    });
  };

  return Event;
};
