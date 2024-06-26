const { Router } = require('express')
const TagsController = require('../controllers/tagsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const tagsRoutes = Router() //executando Router

const tagsController = new TagsController()



tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes