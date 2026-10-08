const express = require("express")
const router = express.Router()
const {
  getSettings,
  updateSiteSettings
} = require("../controllers/siteSettings-controller")
const authorization = require("../middleware/authorization")
const requireAdmin = require('../middleware/requireAdmin')


router.get("/", getSettings)

router.patch("/", authorization, requireAdmin, updateSiteSettings)

module.exports = router
