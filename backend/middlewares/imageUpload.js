//  importando bibliotecas e middlewares.

const multer = require("multer")
const path = require("path")

// destino da imagem salva

const imageStorage = multer.diskStorage({
    // configurando o distino da imagem
    destination: ( req ,file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder = "users"  
        }else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null,`uploads/${folder}/`)
    },
    // nome do arquivo padrão
    filename: (req,file ,cb) => {

        cb(null,Date.now() + path.extname(file.originalname))
    }
})


const imagemUpload = multer({
    storage:imageStorage,
    // verificando o tipo de extensão da imagem
    fileFilter(req,file ,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            
            //apenas uploads em formatos png ou jpg 
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined,true)
    }
})
module.exports = {imagemUpload};