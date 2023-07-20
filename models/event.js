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
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.ENUM('Active', 'Cancelled'),
        allowNull: false
      }
    });
    return Event;
  };
  