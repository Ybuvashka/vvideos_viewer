import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express()
dotenv.config()
app.use(express.json());
const port = process.env.PORT || 8000

//routers
import videoRouter from './routes/videoRouter.js'

// app.use('/', (req,res) => {
//   res.send('hello world')
// })

app.use('/api/v1/uploads',videoRouter)


try{
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log('app starts on port', port)
  })
}catch(err){
  console.log(err) 
  process.exit(1)
}

