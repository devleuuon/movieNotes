const sqlite3 = require('sqlite3') //driver
const sqlite = require('sqlite') //conecta ao banco de dados
const path = require('path')

async function sqliteConnection() {
    const database = await sqlite.open({ //abrindo conexão com banco de dados.
        filename: path.resolve(__dirname, "..", 'database.db'),
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConnection //vai usar no server.js