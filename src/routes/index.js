//aqui será reunido todas as rotas.

const { Router } = require('express') //importando Router do express
const usersRoutes = require('./users.routes') //importando do user.routes

const routes = Router() //rodando o Router

routes.use('/users', usersRoutes) //toda vez que for acessar '/user' vai ser redirecionado para usersRouter.

module.exports = routes