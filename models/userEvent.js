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
    rescheduledTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    acceptedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    declinedTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
  UserEvent.addHook('beforeCreate', async (userEvent, options) => {
    if (userEvent.status === 'Accepted') {
        userEvent.acceptedTime = new Date();
    } else if (userEvent.status === 'Declined') {
        userEvent.declinedTime = new Date();
    }
  });

  UserEvent.addHook('beforeUpdate', async (userEvent, options) => {
    if (userEvent.changed('status')) {
        if (userEvent.status === 'Accepted') {
            userEvent.acceptedTime = new Date();
            userEvent.rescheduledTime = new Date();
        } else if (userEvent.status === 'Declined') {
            userEvent.declinedTime = new Date();
            userEvent.rescheduledTime = null;
        }
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
