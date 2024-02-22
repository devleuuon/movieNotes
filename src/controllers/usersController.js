const appError = require('../utils/appError')
class UsersController {
     create(request, response) {
        const { name, email, password, avatar } = request.body

        if(!name) {
            throw new appError('nome é obrigatório!')
        }

        response.json({ name, email, password, avatar })
    }
}

module.exports = UsersController