const Sequelize = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.development.mySql.options)

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        config.development.mySql.client = sequelize
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }
}

connectToDB()



