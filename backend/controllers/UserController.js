// importando o model de usuario
const User = require("../models/User");

// importando  o bcrypt e jwt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// importando os dados do "dotenv"
const jwtSecret = process.env.JWT_SECRET;


// cricação do token do usuario 
 const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret,{
        dexpiresIn:"7d",
    });
 };

//  registro do usuario e entrada no sistema 

const register = async(req,res) =>{
    res.send("Registro")
};

module.exports= {
    register,

};
