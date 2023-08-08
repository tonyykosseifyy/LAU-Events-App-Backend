const env = require('dotenv').config().parsed
module.exports = {
    development: {
        name: "LAU events Backend",
        version: '1.0.0',
        mySql: {
            options:{
                host: env.DB_HOST || 'localhost',
                port: env.DB_PORT || 3306,
                database: env.DB_NAME || 'lau_event_app',
                dialect: 'mysql',
                username: env.DB_USERNAME || 'root',
                password: env.DB_PASS || '',
                logging: false
            },
            client: null
        },
    },
    test: {
        name: "LAU events Backend",
        version: '1.0.0',
        mySql: {
            options:{
                host: env.DB_HOST || 'localhost',
                port: env.DB_PORT || 3306,
                database: env.DB_NAME || 'LAU_Event_App',
                dialect: 'mysql',
                username: env.DB_USERNAME || 'root',
                password: env.DB_PASS || '',
            },
            client: null
        },
    },
    production: {
        name: "LAU events Backend",
        version: '1.0.0',
        mySql: {
            options:{
                host: env.DB_HOST || 'localhost',
                port: env.DB_PORT || 3306,
                database: env.DB_NAME || 'LAU_Event_App',
                dialect: 'mysql',
                username: env.DB_USERNAME || 'root',
                password: env.DB_PASS || '',
            },
            client: null
        },
    }
}