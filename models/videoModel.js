import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String
})

export default mongoose.model("Video", VideoSchema)