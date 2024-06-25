const { verify } = require('jsonwebtoken')
const AppError = require('../utils/appError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization //token fica no authorization

    if(!authHeader){
        throw new AppError('JWT Token não informado', 401)
    }

    const [, token] = authHeader.split(' ') // vai pegar somente o token que se encontra na segunda posição do array.

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret) //sub é o subject do controller. ele vai ser renomeado pare user_id

        request.user = {
            id: Number(user_id) //user_id vira um número novamente, no controller foi transformado em string.
        }

        return next()
    } catch {
        throw new AppError('JWT Token inválido', 401)
    }
}

module.exports = ensureAuthenticated

