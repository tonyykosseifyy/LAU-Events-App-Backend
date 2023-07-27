module.exports = (sequelize, DataTypes) => {
    const ClubEvent = sequelize.define('ClubEvent', {
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
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
    });
  
    ClubEvent.associate = function(models) {
      ClubEvent.belongsTo(models.Club, {
        foreignKey: 'clubId',
      });
      ClubEvent.belongsTo(models.Event, {
        foreignKey: 'eventId',
      });
    };

    return ClubEvent;
};
