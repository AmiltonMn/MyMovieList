const sequelize = require('sequelize');

const database = new sequelize('MML', 'MMLAdmin', 'mmladmin123456',
    {
        // dialect: 'mssql', host:'localhost', port: 51032 // Sala sem janela port do Amilton

        dialect: 'mssql', host:'localhost', port: 56732 // Sala sem janela port do Fernando

        // dialect: 'mssql', host:'localhost', port: 1433 // Sala Original

        // dialect: 'mssql', host:'localhost', port: 58770 // Casa Amilton

    }
);
database.sync();
module.exports = database;