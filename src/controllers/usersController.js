const appError = require('../utils/appError')
const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs') //criptografia da senha


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

    async update(request, response) {
        const { name, email, password, old_password, avatar} = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

        if(!user) { //se não existir
            throw new appError('Usuário não existe.')
        }

        const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new appError('Este email já está em uso.')
        }

        const hashedPassword = await hash(password, 8)

        user.name = name ?? user.name //passando valor atualizado
        user.email = email ?? user.password //se o campo ficar vazio ao ser atualizado, vai continuar com a última atualização
        
        if (password && !old_password) { //verifica se usuário não deixou o campo vazio
            throw new appError('Você precisa informar a senha antiga para definir a nova senha')
        }
        
        if(password && old_password) { //se os dois campos forem digitados
            const checkOldPassword =  await compare(old_password, user.password)
            
            if(!checkOldPassword) { //se for falso a comparação, retorna a seguinte mensagem.
                throw new appError('A senha antiga não confere')
            }
            
            user.password = await hash(password, 8) //se passar pelos if, vai atualizar a senha
        }
        
        user.password = hashedPassword
        user.avatar = avatar
        
        
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            avatar = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, //banco de dados vai pegar o dia e horário.
            [user.name, user.email, user.password, user.avatar, id]
            )

            return response.json()
    }
}

module.exports = UsersController