const Sequelize = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.development.mySql.options);

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }
}

const syncronizeDB = async () => {
    try {
        await sequelize.sync();
        console.log('All models have been syncronized successfully');
    } catch (err) {
        console.log('Unable to syncronize the database:', err);
    }
}

connectToDB()
config.development.mySql.client = sequelize
require('../models/index.js')
syncronizeDB({force: true})


