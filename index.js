require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db.js')
const projectRouter = require('./routes/projectRouter.js')
const logger = require('./middleware/logger.js')
const serverError = require('./middleware/server-error')
const notFound = require('./middleware/not-found')


connectDB()

app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    console.log('Hello World')
})

app.use('/projects', projectRouter)

app.use(serverError)
app.use(notFound)

//connect routers here

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
