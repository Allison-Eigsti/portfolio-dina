const mongoose = require('mongoose')

let connectionPromise = null

// configurar conexción con base de datos
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
                connectionPromise = null // permitir un nuevo intento en la siguiente solicitud
                throw error
            })
    }

    return connectionPromise
}

module.exports = connectDB