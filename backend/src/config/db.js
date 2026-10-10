const mongoose = require('mongoose')

let connectionPromise = null

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGO_URI, { bufferCommands: false })
            .then((m) => {
                console.log('Connected database:', m.connection.name)
                return m.connection
            })
            .catch((error) => {
                connectionPromise = null // allow a retry on the next request
                throw error
            })
    }

    return connectionPromise
}

module.exports = connectDB