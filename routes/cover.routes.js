const Router = require('express')
const router = new Router()
const CoverController = require('../controllers/cover.controller')

router.post('/',CoverController.createCover)

module.exports = router