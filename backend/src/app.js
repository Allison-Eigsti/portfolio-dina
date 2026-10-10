const express = require('express')
const connectDB = require('./config/db.js')


// import API routes // Make sure paths after restructuring are working
const projectRouter = require('./routes/projectRouter.js')
const catRouter = require('./routes/categoryRouter.js')
const settingsRouter = require('./routes/siteSettingsRouter.js')
const authRouter = require('./routes/authRouter.js')


// import Middlewares
const helmet = require('helmet')
const logger = require('./middleware/logger.js')
const debug = require('debug')('app')
const cors = require('cors')
const serverError = require('./middleware/server-error.js')
const notFound = require('./middleware/not-found.js')


const app = express()

// Connect to database
app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        next(error)
    }
})

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(logger)


// Unprotected Routes
app.use('/auth', authRouter)

//Application routing
app.use('/projects', projectRouter)
app.use('/categories', catRouter)
app.use('/settings', settingsRouter)


// Error Handling
  app.use(notFound)
  app.use(serverError)

module.exports = app


