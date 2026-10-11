const debug = require("debug")("app:error");

// Gestiona los errores internos del servidor (500)
function serverError(err, req, res, next) {
  debug("Error del servidor: %s", err.message);
  res.status(500).json({ error: "500 Internal Server Error" });
}

module.exports = serverError;
