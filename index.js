require('dotenv').config()
const express = require('express')

//Import routers here
const projectRouter = require('./routes/projectRouter.js')

const connectDB = require('./config/db.js')
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    console.log('Hello World')
})

app.use('/projects', projectRouter)

//connect routers here

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
