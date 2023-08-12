const majors = require("../utils/majors");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userType: {
      type: DataTypes.ENUM('Admin', 'User'),
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    major: {
      type: DataTypes.ENUM(...majors),
      allowNull:true
    }
  });

  User.associate = function(models) {
    User.belongsToMany(models.Event, {
      through: models.UserEvent,
      foreignKey: 'userId',
      as: 'events'
    });
  };

  return User;
};
