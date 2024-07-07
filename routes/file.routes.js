const Router = require('express')
const router = new Router()
const fileController = require('../controllers/file.controller')


router.post('',fileController.createDir)
router.post('/upload',fileController.uploadFile)


module.exports = router
