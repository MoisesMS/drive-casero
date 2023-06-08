const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	const data = {
		nombre : "Moisés",
		apellido : "Morente Salazar",
		edad : 27
	}
	res.json(data)
})


module.exports = router
