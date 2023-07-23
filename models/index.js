'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js');
const db = {};

const sequelize = config.development.mySql.client;

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    
    const model = require('./' + file)(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// establish user - refresh token one-to-one relation
db.user = require("../models/user.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.js")(sequelize, Sequelize);


db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});


module.exports = db;
