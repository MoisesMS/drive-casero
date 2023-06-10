const mysql = require("mysql")
require("dotenv").config()

const HOST = process.env.HOST
const USER = process.env.USER
const PASS = process.env.PASS
const BD = process.env.BD

const connection = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASS,
	database: BD
})

module.exports = connection
