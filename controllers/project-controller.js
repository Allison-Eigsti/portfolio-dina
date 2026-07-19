const Project = require('../models/Project')
const projectModel = require('../models/Project')



async function getAllProjects(req, res) {
    try {
        const projects = await Project.find()
        return res.status(200).json(projects)

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}



async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ message: "Project does not exist" })
        }

        return res.status(200).json(project)

    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}



async function createProject(req, res) {
    try {
        const { 
            title, 
            category, 
            client, 
            agency, 
            year, 
            projectBriefing, 
            software, 
            tags, 
            thumbnail, 
            images, 
            layout, 
            displayOrder 
        } = req.body

        if (!title || !category || !thumbnail?.url || displayOrder === undefined ) {
            return res.status(400).json({
                message: "Title, category, thumbnail and display order are required"
            })
        }

        const categoryExists = await Category.findById(category)

        if (!categoryExists) {
            return res.status(400).json({
                message: "Category does not exist"
            })
        }

        const project = new Project({
            title,
            category,
            client,
            agency,
            year,
            projectBriefing,
            software,
            tags,
            thumbnail,
            images,
            layout,
            displayOrder,
            createdBy: req.user.id
        })

        await project.save()

        return res.status(201).json(project)

    } catch(err) {

        if (err.code === 11000) {
            return res.status(400).json({
                message: "A project with this title already exists"
            })
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            })
        }

        res.status(500).json({ message: err.message })
    }
}



async function updateProject(req, res) {
    try {
        const allowedFields = [
            "title",
            "category",
            "client",
            "agency",
            "year",
            "projectBriefing",
            "software",
            "tags",
            "thumbnail",
            "images",
            "layout",
            "displayOrder",
            "published"
        ]

        const updates = {}

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field]
            }
        })

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        )

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            })
        }

        return res.status(200).json(project)

    } catch(err) {

        if (err.code === 11000) {
            return res.status(400).json({
                message: "A project with this title already exists"
            })
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            })
        }

        return res.status(500).json({
            message: err.message
        })
    }
}

async function deleteProject(req, res) {
    try {
        const deleteProject = await Project.findByIdAndDelete(req.params.id)
       
        if(!deleteProject) {
            return res.status(404).json({ message: 'Project not found. '})
        }

         return res.status(200).json({ message: 'Project deleted successfully'})
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}