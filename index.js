require('dotenv').config()
const express = require('express')

//Import routers here

const connectDB = require('./config/db.js')
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    console.log('Hello World')
})

//connect routers here

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
