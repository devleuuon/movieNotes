const { Router } = require('express')
const NotesController = require('../controllers/notesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const notesRoutes = Router() //executando Router

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)//vai ser aplicado para todas as rotas abaixo.

notesRoutes.get('/', notesController.index) //está passando sem parâmetro porque será passado o parâmetro dentro do insomnia
notesRoutes.post('/', notesController.create) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.
notesRoutes.get('/:id', notesController.show) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes