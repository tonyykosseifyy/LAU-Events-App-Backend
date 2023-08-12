module.exports = (sequelize, DataTypes) => {
  const UserEvent = sequelize.define('UserEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('Ignored', 'Accepted', 'Declined'),
      allowNull: false
    },
    isRescheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rescheduledTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  UserEvent.associate = function(models) {
    UserEvent.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    UserEvent.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event'    
    });
  };

  return UserEvent;
};
