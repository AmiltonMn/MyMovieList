require('dotenv').config();
const Sequelize = require('sequelize');

// Pega a URL do banco de dados do ambiente
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("A variável de ambiente DATABASE_URL não está definida.");
}

const database = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: true, // Caso o provedor precise de SSL
    }
});

database.sync()
    .then(() => console.log("Conectado com sucesso ao banco de dados PostgreSQL"))
    .catch(err => console.error("Erro ao conectar ao banco de dados:", err));

module.exports = database;
