// importação de middlewares
const express = require("express")
const router = express.Router()


// importando controllers
const {register} = require("../controllers/UserController");


// Middlewares

const validate = require ("../middlewares/handleValidation");


// Rotas
router.post("/register", register);


module.exports = router;