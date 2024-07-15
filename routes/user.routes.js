const Router = require('express')
const router = new Router()
const UserController = require('../controllers/user.controller')

router.post('/',UserController.createUser)

module.exports = router