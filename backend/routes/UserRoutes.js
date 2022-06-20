// importação de middlewares
const express = require("express")
const router = express.Router()


// importando controllers
const {register} = require("../controllers/UserController");


// Middlewares

const validate = require ("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/userValidations");


// Rotas
router.post("/register",userCreateValidation(),validate, register);


module.exports = router;