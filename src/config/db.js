const sequelize = require('sequelize');

const database = new sequelize('MML', 'MMLAdmin', 'mmladmin123456',
    {
        // dialect: 'mssql', host:'localhost', port: 51032

        dialect: 'mssql', host:'localhost', port: 56732

        /* 
            Config com o banco de dados da sala original no pc do Amilton
        */
        // dialect: 'mssql', host:'localhost', port: 1433
        // dialect: 'mssql', host:'localhost', port: 51032
    }
);
database.sync();
module.exports = database;