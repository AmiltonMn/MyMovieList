const Sequelize = require('sequelize');

const database = new Sequelize('MML', 'MMLAdmin', 'mmladmin123456',
    {
        dialectOptions: {
            useUTC: false
        },

        // dialect: 'mssql', host:'localhost', port: 51032, // Sala sem janela port do Amilton

        // dialect: 'mssql', host:'localhost', port: 56732, // Sala sem janela port do Fernando

        dialect: 'mssql', host:'localhost', port: 1433, // Sala Original

        // dialect: 'mssql', host:'localhost', port: 58770, // Casa Amilton

        timeZone: '+03:00'
    }
);
database.sync();
module.exports = database;