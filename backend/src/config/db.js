const mongoose = require("mongoose");
const debug = require("debug")("app:db");


let connectionPromise = null;

// configurar conexción con base de datos
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, { bufferCommands: false })
      .then((m) => {
        debug("Conectado a MongoDB");
        return m.connection;
      })
      .catch((error) => {
        connectionPromise = null; // permitir un nuevo intento en la siguiente solicitud
        debug("Error al conectar con MongoDB: %s", error.message);
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
