// importando o model de usuario
const User = require("../models/User");

// importando  o bcrypt e jwt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// importando os dados do "dotenv"
const jwtSecret = process.env.JWT_SECRET;


// cricação do token do usuario 
 const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret,{
        expiresIn:"7d",
    });
 };

//  registro do usuario e entrada no sistema 

const register = async(req,res) =>{
    const {name,email,password} = req.body

    // verificando se o usuário existe
    const user =await User.findOne({email})

    if(user){
        res.status(422).json({erros:["Por favor, utiize outro e-mail"]})
    }
    
    // gerando o hash da senha 

     const  salt = await bcrypt.genSalt()
     const passwordHash = await bcrypt.hash(password,salt)

   // criação de usuario 
     const newUser = await User.create({
        name,
        email,
        password:passwordHash
     })

    // checagem se o usuário foi craiado com sucesso, retonando um token
     if(!newUser){
        res.status(422).json({erros:["Houve um erro, por favor tente mais tarde."]})
        return
     }
     res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
     });
};
 

// login do usuario
const login = async (req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

   // checagem de usuario, se ele existe

   if(!user){
      res.status(404).json({erros: ["Usuário não encontrados."]})
      return 
   }

   // checagem se a senha do usuario são iguais 

   if(!(await bcrypt.compare(password,user.password))){
      res.status(422).json({erros: ["Senha inválida."]})
      return
   }

   //  retorna o usuario com token
   res.status(201).json({
      _id: user._id,
      profileImage:user.profileImage,
      token: generateToken(user._id),
   });
};

// resgatando usuario autenticado 
const getCurrentUser = async (req,res) => {
   const user = req.user;
   
   res.status(200).json(user);
}
// atualizando um usuário

const update = async(req,res) => {
  const{name,password,bio} = req.body
  
  let profileImage = null

   if(req.file){
      profileImage = req.file.filename
   }

   const reqUser = req.user

   const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-passaword")

   if(name){
      user.name = name
   }
   if (password){
      const  salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password,salt);

      user.password = passwordHash
   }
   if(profileImage){
      user.profileImage = profileImage
   }
   if(bio){
      user.bio = bio
   }
   await user.save();

   res.status(200).json(user);
}

// pegando o usuario pelo id da requisição 

const getUSerByid = async(req,res) => {
   const {id} = req.params

      try {
         const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

         // checando de o usuario existe

   if(!user) {
      res.status(404).json({erros:["Usuário não encontrado."]})
      return
   }
   res.status(200).json(user);
}
       catch (error) {
         res.status(404).json({erros:["Usuário não encontrado."]})
         return
      }
   }



module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUSerByid

};
