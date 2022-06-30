// importação dos middlewares e bibliotecas

const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET


const authGuard = async (req,res,next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

//checagem se o cabecalho da requisição tem o token

if(!token) return res.status(401).json({errors:["Acesso negado!"]})

// checando se o token é valido 
try {
    
    const verifed = jwt.verify(token, jwtSecret)

    req.user = await  User.findById(verifed.id).select("-password");

    next();
    
} catch (error) {
    res.status(401).json({errors:["Token inválido."]})
}
}

module.exports = {
    authGuard
}