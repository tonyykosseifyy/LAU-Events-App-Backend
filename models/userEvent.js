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
      responseTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
    return UserEvent;
  };
  