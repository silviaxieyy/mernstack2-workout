require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')

const app = express()

//middleware
app.use(express.json())
app.use(cors({
  origin: 'http://mernstack2-workout.vercel.app',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected to Database.')
    //listen to port
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and listening on the port 4000')
    })
  })
  .catch((error) => {
    console.log(error)
  })

