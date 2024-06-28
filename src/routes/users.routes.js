const { Router } = require('express')
const UsersController = require('../controllers/usersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const multer = require('multer')
const uploadConfig = require('../configs/upload.js')
const UserAvatarController = require('../controllers/userAvatarController.js')

const usersRoutes = Router() //executando Router
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()



usersRoutes.post('/', usersController.create) //userController vai criar o conteúdo e esse usersRoutes vai ser passado no index.
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update) //patch é para atualizar um campo especifico. put é para atualizar mais de um campo. o single é pq vai ser carregado um arquivo só.

module.exports = usersRoutes