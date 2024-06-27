const { Router } = require('express')
const UsersController = require('../controllers/usersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router() //executando Router

const usersController = new UsersController()



usersRoutes.post('/', usersController.create) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.
usersRoutes.put('/', ensureAuthenticated, usersController.update)

module.exports = usersRoutes