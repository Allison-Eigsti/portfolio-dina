const express = require("express");
const connectDB = require("./config/db.js");

// importar rutas de API
const projectRouter = require("./routes/projectRouter.js");
const catRouter = require("./routes/categoryRouter.js");
const settingsRouter = require("./routes/siteSettingsRouter.js");
const authRouter = require("./routes/authRouter.js");

// importar Middlewares
const helmet = require("helmet");
const logger = require("./middleware/logger.js");
const debug = require("debug")("app");
const cors = require("cors");
const serverError = require("./middleware/server-error.js");
const notFound = require("./middleware/not-found.js");

// inicar instancia de express
const app = express();

// Conectar al base de datos
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas protegidas
app.use("/auth", authRouter);

// Rutas de la aplicación
app.use("/projects", projectRouter);
app.use("/categories", catRouter);
app.use("/settings", settingsRouter);

// Manejar errores
app.use(notFound);
app.use(serverError);

module.exports = app;
