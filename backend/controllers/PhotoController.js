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
        return
    }
 

    res.status(201).json(newPhoto)
}

// remoção de foto do banco de dados 

const deletePhoto = async(req,res) => {
    const {id} = req.params

    const reqUser = req.user
        
    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))


        //  checando se a foto existe 
        if(!photo){
            res.status(404).json({erros:["Foto não encontrada!"]})
            return
        }
    
        //  checando se a foto pertence ao usuário
    
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({erros:["Ocorreu um erro, por favor tente novamente mais tarde."]})
        }
        await Photo.findByIdAndDelete(photo._id)
    
        res.status(200).json({id:photo._id,message:"Foto excluída com sucesso."})
    } catch (error) {
        res.status(404).json({erros:["Foto não encontrada!"]})
            return
    }
}

//  resgantando todas as fotos

const getAllPhotos = async(req,res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos);


}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
}