// importação de middlewares
const express = require("express")
const router = express.Router()


// importando controllers
const {register, login, getCurrentUser,update, getUserByid} = require("../controllers/UserController");



// Middlewares

const validate = require ("../middlewares/handleValidation");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const { authGuard } = require("../middlewares/authGuard");
const { imagemUpload } = require("../middlewares/imageUpload");



// Rotas
router.post("/register",userCreateValidation(),validate, register);
router.post("/login",loginValidation(),validate, login);
router.get("/profile",authGuard,getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imagemUpload.single("profileImage"),update)
router.get("/:id", getUserByid);


module.exports = router;