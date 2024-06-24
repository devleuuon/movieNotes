const { Router } = require('express')

const SessionsController = require('../controllers/sessionsController')
const sessionsController = new SessionsController() //como é classe, tem que usar o new.

const sessionsRoutes = Router()
sessionsRoutes.post('/', sessionsController.create)

module.exports = sessionsRoutes