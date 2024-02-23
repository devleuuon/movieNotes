const sqliteConnection = require('../../sqlite') //importando a conexão com o banco de dados
const createUsers = require('./createUsers') //importando a criação da tabela

async function migrationsRun() { //função que vai rodar as migrations
    const schemas = [
        createUsers
    ].join('')

    sqliteConnection().then(db => db.exec(schemas)) //conexão com o banco de dados executa schemas
    .catch(error => console.error(error))
}

module.exports = migrationsRun
