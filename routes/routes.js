const express = require("express")
const fs = require("fs")
const util = require("util")
const path = require("path")
const multer = require("multer")


const storage = multer.diskStorage({
  destination: "C:/Users/Daiara/Documents/programacion/web/drive-casero/storage/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const router = express.Router()



router.get("/api/dir", (req, res) => {

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



router.post("/api/upload", upload.array("archivos", 10), (req, res) => {
	if (!req.files) {
    res.status(400).send('No se proporcionó ningún archivo');
  } else {
    // Aquí puedes realizar acciones con el archivo, como guardarlo en una base de datos o en el sistema de archivos
    res.send('Archivo recibido y guardado');
  }
})

module.exports = router
