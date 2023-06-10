const express = require("express")
const fs = require("fs")
const util = require("util")
const controller = require("../controller/controller")
const path = require("path")
const router = express.Router()


router.get("/", (req, res, next) => {

	let { route } = req.body


	if(route == undefined) {
		route = "/"
	}

	const mainDir = __dirname
  const dir = path.join(mainDir, `../storage${route}`)
  
  let contenido = []
  let dataFile;

  fs.readdirSync(dir).forEach(file => {
    
    try {
      const filePath = path.join(dir, file)
      dataFile = fs.lstatSync(filePath)
    

      if(dataFile) {
        let isDir, tam

        isDir = dataFile.isDirectory() ? "Directorio" : "Archivo"
        tam = dataFile.isDirectory() ? "N/A" : dataFile.size

        contenido.push({
          "nombre" : file,
          "tipo" : isDir,
          "size" : tam
        })
      }
    } catch(e) {
      console.log(e)
    }
	})


  
  res.json(contenido)
})

module.exports = router
