const Router = require('express')
const router = new Router()
const fileController = require('../controllers/file.controller')


router.post('/',fileController.uploadFile)


module.exports = router
