const Cover = require('../models/cover.model')

class CoverController {
    async createCover(req,res){

        const cover = new Cover(req.body)

        try{
            await cover.create()
            return res.status(200).json({msg: 'cover was created'})
        }catch(err){
            console.log(err);
            res.status(400).json({msg:'create cover error'})
        }
    }
}