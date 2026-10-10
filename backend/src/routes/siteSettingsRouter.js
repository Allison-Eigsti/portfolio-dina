const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSiteSettings,
} = require("../controllers/siteSettings-controller");
const authorization = require("../middleware/authorization");
const requireAdmin = require("../middleware/requireAdmin");

// Rutas para confuguración
router.get("/", getSettings);

// Ruta protegida- edita la configuración
router.patch("/", authorization, requireAdmin, updateSiteSettings);

module.exports = router;
