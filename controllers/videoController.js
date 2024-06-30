import Video from '../models/videoModel.js'


export const uploadVideo = async(req,res)=>{
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        url: `/uploads/${req.file.filename}`
    })
    await video.save()
    res.status(200).json(video)
}