const Project = require('../models/Project')
const Category = require('../models/Category')
const slugify = require("slugify")
const { uploadImage, deleteImage } = require("../services/cloudinaryService")

async function getAllProjects(req, res) {
    try {
        const projects = await Project.find()
        return res.status(200).json(projects)

    } catch(err) {
        return res.status(500).json({ message: err.message })
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
        return res.status(500).json({ message: err.message })
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
            displayOrder 
        } = req.body

        if (!title || !category || displayOrder === undefined ) {
            return res.status(400).json({
                message: "Title, category, and display order are required"
            })
        }

        if (!req.files?.thumbnail?.[0]) {
            return res.status(400).json({
                message: "A thumbnail is required"
            });
        }

        if (!req.files?.images?.length) {
            return res.status(400).json({
                message: "At least one project image is required"
            });
        }

        const categoryExists = await Category.findById(category)

        if (!categoryExists) {
            return res.status(400).json({
                message: "Category does not exist"
            })
        }

        // Parse arrays/objects from multipart/form-data
        const software = req.body.software
            ? JSON.parse(req.body.software)
            : []

        const tags = req.body.tags
            ? JSON.parse(req.body.tags)
            : []

        const layout = req.body.layout
            ? JSON.parse(req.body.layout)
            : {}

        //Generate slug
        const slug = slugify(title, {
            lower: true,
            strict: true
        })

        //Upload thumbnail to Cloudinary
        const thumbnailResult = await uploadImage(
            req.files.thumbnail[0],
            `portfolio/projects/${slug}/thumbnail`
        )

        // Upload project images to Cloudinary
        const imageResults = await Promise.all(
            req.files.images.map((file) =>
                uploadImage(
                    file,
                    `portfolio/projects/${slug}`
                )
            )
        )

        // Build thumbnail object for MongoDB
        const thumbnail = {
            url: thumbnailResult.secure_url,
            publicId: thumbnailResult.public_id,
            alt: ""
        }

        // Build images array for MongoDB
        const images = imageResults.map((image) => ({
            url: image.secure_url,
            publicId: image.public_id,
            alt: ""
        }))

        const project = new Project({
            title,
            slug,
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
        console.error(err)

        if (err instanceof SyntaxError) {
            return res.status(400).json({
                message: "Software, tags, or layout contains invalid JSON"
            });
        }

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

        return res.status(500).json({ message: err.message })
    }
}



async function updateProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const allowedFields = [
            "title",
            "category",
            "client",
            "agency",
            "year",
            "projectBriefing",
            "published"
        ]


        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                project[field] = req.body[field]
            }
        })

        if (req.body.software !== undefined) {
            project.software = JSON.parse(req.body.software);
        }

        if (req.body.tags !== undefined) {
            project.tags = JSON.parse(req.body.tags);
        }

        if (req.body.layout !== undefined) {
            project.layout = JSON.parse(req.body.layout);
        }

        if (req.files?.thumbnail?.[0]) {

            const newThumbnailResult = await uploadImage(
                req.files.thumbnail[0],
                `portfolio/projects/${project.slug}/thumbnail`
            );

            const newThumbnail = {
                url: newThumbnailResult.secure_url,
                publicId: newThumbnailResult.public_id,
                alt: ""
            };

            // Delete old thumbnail
            if (project.thumbnail?.publicId) {
                await deleteImage(project.thumbnail.publicId);
            }

            project.thumbnail = newThumbnail;
        }

        // Replace project images if new images were uploaded
        if (req.files?.images?.length) {

            const newImageResults = await Promise.all(
                req.files.images.map(file =>
                    uploadImage(
                        file,
                        `portfolio/projects/${project.slug}`
                    )
                )
            );

            const newImages = newImageResults.map(image => ({
                url: image.secure_url,
                publicId: image.public_id,
                alt: ""
            }));

            // Delete old project images
            if (project.images?.length) {
                await Promise.all(
                    project.images
                        .filter(image => image.publicId)
                        .map(image => deleteImage(image.publicId))
                );
            }

            project.images = newImages;
        }


        await project.save()

        return res.status(200).json(project)

    } catch(err) {
        if (err.name === "SyntaxError") {
            return res.status(400).json({
                message: "Software, tags, or layout contains invalid JSON"
            });
        }

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


async function reorderProject(req, res) {
    try {
        const { newOrder } = req.body

        if (newOrder === undefined) {
            return res.status(400).json({
                message: "New order is required"
            })
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            })
        }

        const projects = await Project.find({
            category: project.category
        }).sort({ displayOrder: 1 })

        const newIndex = Number(newOrder) - 1

        if (
            newIndex < 0 ||
            newIndex >= projects.length
        ) {
            return res.status(400).json({
                message: "Invalid display order"
            })
        }

        const currentIndex = projects.findIndex(
            item => item._id.toString() === project._id.toString()
        );

        const [movedProject] = projects.splice(currentIndex, 1)

        projects.splice(newIndex, 0, movedProject)

        projects.forEach((project, index) => {
            project.displayOrder = index + 1;
        })

        await Promise.all(
            projects.map(project => project.save())
        )

        return res.status(200).json(projects)

    } catch (err) {
        console.error(err)

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
        return res.status(500).json({ message: err.message })
    }
}



module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    reorderProject,
    deleteProject
}