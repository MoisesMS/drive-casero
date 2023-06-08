const express = require("express")
const controller = require("../controller/controller")

const router = express.Router()

router.get("/api", controller.getData)

router.post("/api/data", controller.sendData)


module.exports = router
