module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });
    return Admin;
  };
  