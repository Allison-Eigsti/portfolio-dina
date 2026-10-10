const express = require("express")
const router = express.Router()
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  reorderProject,
  reorderProjectImages,
  deleteProject,
} = require("../controllers/project-controller")
const authorization = require("../middleware/authorization")
const requireAdmin = require('../middleware/requireAdmin')
const upload = require('../middleware/upload')


// Rutas para proyectos
// Rutas no protegidas
router.get("/", getAllProjects)
router.get("/:id", getProjectById)

// Middleware que protege las siguientes rutas
router.use(authorization, requireAdmin)

// Crear un proyecto nuevo
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]),
  createProject,
)

// Editar un proyecto
router.put("/:id",
      upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]), 
  updateProject)

  // Editar el orden de los proyectos (no lo he utilizado todavía)
router.patch("/:id", reorderProject)
router.patch("/:id", reorderProjectImages)

// Borrar proyecto
router.delete("/:id", deleteProject)

module.exports = router
