const express = require("express")
const router = express.Router()
const {
  getSettings,
  updateSiteSettings
} = require("../controllers/siteSettings-controller")
const authorization = require("../middleware/authorization")

router.get("/", getSettings)

router.use(authorization)

router.patch("/", updateSiteSettings)

module.exports = router
