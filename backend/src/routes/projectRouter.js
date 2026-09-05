const express = require('express')
const router = express.Router()
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/project-controller')
const mockAuth = require("../middleware/mockAuth")


router.get('/', getAllProjects)
router.get('/:id', getProjectById)

router.use(mockAuth)

router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

module.exports = router
