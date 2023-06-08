const path = require("path")

const getData = (req, res) => {
	const data = {
		nombre : "Moisés",
		apellido : "Morente Salazar",
		edad : 27
	}
	res.json(data)
}

const sendData = (req, res) => {
	const data = req.body

	res.status(201).json(data)
}

module.exports = { getData, sendData }
