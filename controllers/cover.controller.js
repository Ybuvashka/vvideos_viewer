const Cover = require('../models/cover.model')

class CoverController {
    async createCover(req,res){
        req.body.createdBy = req.user._id
        const cover = await Cover.create(req.body)
        res.status(201).json({cover})
    }
}

module.exports = new CoverController()