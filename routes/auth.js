const express = require("express")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const controller = require("../controller/controller")
const db = require("../controller/db");
const fs = require("fs")

const router = express.Router()

router.post("/register", (req, res) => {
	const { user, pass, email } = req.body

	const hashPsw = bcrypt.hashSync(pass, 10)

	db.query(
		"SELECT user FROM users WHERE user = ? AND email = ?",
		[ user, email ],
		(error, resultados) => {
			if(error || resultados.length > 0) {
				res.status(401).send("Error. el usuario o el email ya existen")
				console.log(error)
			} else {
				db.query(
					"INSERT INTO users (user, pass, email, storage) VALUES (?, ?, ?, ?)",
					[user, hashPsw, email, user],
					error => {
						if(error) {
							res.status(500).send("Error al registrar el usuario")
						} else {

							fs.mkdir(`./storage/${user}`, error => {
								if(error) console.log(error)
								else console.log("Carpeta creada con éxito")
							})
							res.status(201).send("Usuario creado correctamente")
						}
					}
				)
			}
		}
	)

})

module.exports = router
