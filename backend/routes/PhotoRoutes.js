//  importando bibliotecas
const express = require("express")
const router = express.Router()

// Controllers 
const {insertPhoto, deletePhoto, getAllPhotos} = require("../controllers/PhotoController")


// Middlewares
const{photoInsertValidation} = require("../middlewares/photoValidation");
const {authGuard} = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const {imagemUpload} = require("../middlewares/imageUpload")


// Routes
router.post("/", authGuard, imagemUpload.single("image"),photoInsertValidation(),validate,insertPhoto);
router.delete("/:id",authGuard,deletePhoto)
router.get("/", authGuard,  getAllPhotos)



module.exports = router