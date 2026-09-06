const express = require('express')
const connectDB = require('./config/db.js')


// import API routes // Make sure paths after restructuring are working
const projectRouter = require('./routes/projectRouter.js')
const catRouter = require('./routes/categoryRouter.js')
const authRouter = require('./routes/authRouter.js')


// import Middlewares
const logger = require('./middleware/logger.js')
const helmet = require('helmet')
const debug = require('debug')('app')
//import cors
const serverError = require('./middleware/server-error.js')
const notFound = require('./middleware/not-found.js')



const app = express()

// Connect to database
connectDB()

//app.use(cors()) ?? where does this go

// Middleware
app.use(express.json())
app.use(logger)
app.use(helmet())


// Unprotected Routes
app.use('/auth', authRouter)

//Application routing
app.use('/projects', projectRouter)
app.use('/categories/', catRouter)


// Error Handling
app.use(serverError)
app.use(notFound)

module.exports = app


