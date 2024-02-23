const appError = require('../utils/appError')
const sqliteConnection = require('../database/sqlite')
const { hash } = require('bcryptjs') //criptografia da senha


class UsersController {
     async create(request, response) {
        const { name, email, password, avatar } = request.body

        const database = await sqliteConnection() //await para se conectar com banco de dados, pois nem sempre ele vai conectar no mesmo tempo.
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(checkUserExists) {
            throw new appError('Este e-mail já está em uso.')
        }

        const hashedPassword = await hash(password, 8) //8 é o fator de complexidade

        await database.run('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
        [ name, email, hashedPassword, avatar ]) //inserir elementos do insomnia para o banco de dados.

        return response.status(201).json()
    }
}

module.exports = UsersController