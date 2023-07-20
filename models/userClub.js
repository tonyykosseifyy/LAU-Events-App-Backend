module.exports = (sequelize, DataTypes) => {
    const UserClub = sequelize.define('UserClub', {
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
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
    return UserClub;
  };
  