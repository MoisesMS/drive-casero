const express = require("express")
const controller = require("../controller/controller")

const router = express.Router()

router.get("/", controller.getData)

router.post("/data", controller.sendData)


module.exports = router
