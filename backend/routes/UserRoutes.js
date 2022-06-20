// importação de middlewares
const express = require("express")
const router = express.Router()


// importando controllers
const {register} = require("../controllers/UserController")


// Rotas
router.post("/register", register);


module.exports = router;