const Router = require('express')
const router = new Router()
const UserController = require('../controllers/user.controller')

router.route('/').post(UserController.createUser).get(UserController.getAllUsers)
router.get('/:id',UserController.getUser)

module.exports = router