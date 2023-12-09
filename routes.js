const express = require("express")
const controller = require("./controller")
const router = express.Router()

router.get("/get-home-content", controller.getHomeContent)
router.get("/get-content-inside", controller.getContentInside)

module.exports = router
