require('dotenv').config();
const Sequelize = require('sequelize');

// Verifica se está em produção ou desenvolvimento (localhost)
const isProduction = process.env.NODE_ENV === 'production';

// Se estiver em produção, utiliza a URL do banco remoto, senão usa o localhost
const databaseUrl = isProduction ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL;

const database = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: isProduction ? { require: true, rejectUnauthorized: false } : false, // SSL apenas em produção
    }
});

database.sync()
    .then(() => console.log("Conectado com sucesso ao banco de dados"))
    .catch(err => console.error("Erro ao conectar ao banco de dados:", err));

module.exports = database;
