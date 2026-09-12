const express = require("express")
const router = express.Router()
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project-controller")
const authorization = require("../middleware/authorization")
const upload = require('../middleware/upload')

router.get("/", getAllProjects)
router.get("/:id", getProjectById)

router.use(authorization)

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]),
  createProject,
)

router.put("/:id",
      upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 20 },
  ]), 
  updateProject)

router.delete("/:id", deleteProject)

module.exports = router
