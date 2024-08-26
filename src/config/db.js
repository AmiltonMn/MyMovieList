const sequelize = require('sequelize');

const database = new sequelize('MML', 'MMLAdmin', 'mmladmin123456',
{
    dialect: 'mssql', host:'localhost', port: 56714
}
)