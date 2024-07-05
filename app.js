const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const app = express()
dotenv.config()

const port = process.env.PORT || 8000

//routers
const fileRouter = require('./routes/fileRouter.js')

app.use(fileUpload({}))
app.use(express.json())
app.use('/api/files', fileRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,)
    app.listen(port, () => {
      console.log('app starts on port', port)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()