import { Router } from 'express'
import { upload } from '../utils/storage.js'
import { uploadVideo } from '../controllers/videoController.js'
const router = Router()

router.post('/upload-video', upload.single('video'), uploadVideo)

export default router
