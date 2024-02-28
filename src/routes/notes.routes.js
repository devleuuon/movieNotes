const { Router } = require('express')
const NotesController = require('../controllers/notesController')

const notesRoutes = Router() //executando Router

const notesController = new NotesController()



notesRoutes.post('/:user_id', notesController.create) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.
notesRoutes.get('/:id', notesController.show) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.

module.exports = notesRoutes