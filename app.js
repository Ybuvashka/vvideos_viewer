const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const fs = require('fs')

const app = express()
dotenv.config()

const port = process.env.PORT || 8000

//routers
const fileRouter = require('./routes/file.routes.js')
const userRouter = require('./routes/user.routes.js')
const authRouter = require('./routes/auth.routes.js')
const coverRouter = require('./routes/cover.routes.js')

//middlewares
const authenticateUser = require('./middleware/auth.middleware.js')

app.use(fileUpload({}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/files', fileRouter)
app.use('/api/covers',authenticateUser,coverRouter)
app.use('/api/users',authenticateUser, userRouter)
app.use('/api/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log('app starts on port', port)
    })
    if (!fs.existsSync(process.env.FILE_PATH)) {
      fs.mkdirSync(process.env.FILE_PATH, { recursive: true })
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
