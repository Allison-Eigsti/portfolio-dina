const siteSettings = require('../models/SiteSettings')


async function getSettings(req, res) {
    try {
        const settings = await siteSettings.findOne()
        
        if (!settings) {
            return res.status(404).json({
                message: 'Site Settings not found'
            })
        }

        return res.status(200).json(settings)
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}


async function updateSiteSettings(req, res) {
    try {
        const settings = await siteSettings.findOne()

        if (!settings) {
            return res.status(404).json({
                message: 'Site Settings not found'
            })
        }

        if (req.body.siteTitle !== undefined) {
            settings.siteTitle = req.body.siteTitle
        }

        const nestedFields = [
            "about",
            "contact",
            "socialLinks"
        ]

        nestedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                settings[field] = {...settings[field], ...req.body[field]}
            }
        })


        await settings.save()

        return res.status(200).json(settings)
    } catch (err) {

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

module.exports = {
    getSettings,
    updateSiteSettings
}


