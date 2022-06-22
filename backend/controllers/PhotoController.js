// improtando models
const Photo = require("../models/Photo")
const User = require("../models/User")


// conexão com banco de dados 
const mongoose = require("mongoose")


// inserindo uma foto com usuario relacionado a ela 

const insertPhoto = async(req,res) => {
    const{title} = req.body;
    const image = req.file.filename;
    
    const reqUser = req.user

    const user = await User.findById(reqUser._id);

    // criando a foto 
    const newPhoto = await Photo.create({
        image,
        title,
        userId:user._id,
        userName:user.name,
    });

    //  checando se a foto foi criada com sucesso, mostrando a data 

    if(!newPhoto){
        res.status(422).json({
            erros:["Houve um problema, por favor tente novamente mais tarde."]
        })
    }
 

    res.status(201).json(newPhoto)
}

module.exports = {
    insertPhoto,
}