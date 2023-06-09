const express = require("express")
const bcrypt = require("bcrypt");
const db = require("../controller/db");
const fs = require("fs")
const util = require("util")

const router = express.Router()

const mkdir = util.promisify(fs.mkdir)
const rmdir = util.promisify(fs.rm)

router.post("/register", async (req, res) => {
	try {
		const { user, pass, email } = req.body

		if(!user || !pass || !email) {
			res.status(400).send("Error. Falta usuario, contraseña o email")
			return
		}

		const hashPsw = bcrypt.hashSync(pass, 10)

		const resultados = await db.query(
			"SELECT user FROM users WHERE user = ? AND email = ?",
			[user, email]
		)

		if(resultados > 0) {
			res.status(401).send("Error. El usuario o email ya existe")
			return
		}

		await db.query(
			"INSERT INTO users (user, pass, email, storage) VALUES (?, ?, ?, ?)",
			[user, hashPsw, email, user]
		)

			await mkdir(`./storage/${user}`)
			console.log("Carpeta creada con éxito")
			res.status(201).send("Usuario creado con éxito")
	} catch (error) {
		console.log(error);
    res.status(500).send("Error al registrar el usuario")
	}
})


// FIXME Error al eliminar un usuario. Problema de permisos (Solo sucede en thunder client)
// FIXME La petición se recibe y el servidor la procesa. Pero no envía respuesta
router.delete("/", async (req, res) => {
  const { user } = req.body;

  try {
    if (!user) {
      res.status(400).send("Error. No se ha introducido un usuario");
      return;
    }

    const resultado = await db.query(
      "SELECT user FROM users WHERE user = ?",
      [user]
    );

    if (resultado.length === 0) {
      res.status(400).send("Error. El usuario no existe");
      return;
    }

    await db.query("DELETE FROM users WHERE user = ?", [user]);

    await rmdir(`./storage/${user}`, { recursive: true }, (error) => {
      if (error) {
        res.status(500).send("La carpeta no existe");
        return;
      }
      console.log("Carpeta eliminada con éxito");
    });

		// BUG No se alcanza esta parte del código
    res.status(200).send("Usuario eliminado con éxito");

  } catch (error) {
    res.status(500).send("Error al eliminar el usuario");

    console.log(error);
  }
});

//TODO Implementar sistema de autentificación con JWT
module.exports = router
