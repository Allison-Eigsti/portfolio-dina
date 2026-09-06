const express = require('express')


// import API routes // Make sure paths after restructuring are working
const projectRouter = require('./routes/projectRouter.js')

// import Middlewares
const logger = require('./middleware/logger.js')
//import cors
const serverError = require('./middleware/server-error.js')
const notFound = require('./middleware/not-found.js')


const app = express()

//app.use(cors()) ?? where does this go

// Middleware
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    console.log('Hello World')
})

//Application routing
app.use('/projects', projectRouter)


// Error Handling
app.use(serverError)
app.use(notFound)

module.exports = app


