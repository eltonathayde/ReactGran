// improtando models
const Photo = require("../models/Photo")
const User = require("../models/User")


// conexão com banco de dados 
const mongoose = require("mongoose");
const { json } = require("express");


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
// resgatando todas as fotos do usuario

const getUserPhotos = async(req,res) => {
    const {id} = req.params

    const photos = await Photo.find({userId:id}).sort([["createdAt", -1]]).exec()


    return res.status(200).json(photos)
}
// resgatando foto pelo id 

const getPhotoById = async (req,res) => {

    const {id} = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    // checandp se a foto existe

    if(!photo){
        res.status(404).json({ errors: ["Foto não encontrada."]});
        return
    }
    res.status(200).json(photo);
}

// atualizando uma foto

const updatePhoto = async(req,res) => {
    const {id} = req.params
    const {title} = req.body 

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // checando se a foto existe

    if(!photo) {
        res.status(404).json({errors : ["Foto não encontrada"]})
        return
    }
        // check se a foto pertence ao usuario

        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors:["Ocorreu um erro, por favor tente novamnete mais tarde."],})

            return
        }
        if(title){
            photo.title = title
        }
        await photo.save()
        
        res.status(200).json({photo,message:"Foto atualizada com sucesso!"})
}

// funcionalidade do like 

const likePhoto = async(req,res) =>{
    const {id} = req.params
    const reqUser = req.user 

    const photo = await Photo.findById(id)
    //  checando se a foto existe
    if(!photo) {
        res.status(404).json({errors : ["Foto não encontrada"]})
        return
    }
    // checando se o usuario ja deu like  na foto 
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors:["você já curtiu a foto."]})
        return;
    }
    //  adicionar o id do usaario no arrya de likes
    photo.likes.push(reqUser._id)

    photo.save()
    
    res.status(200).json({photoId: id, userId: reqUser._id,massage:"A foto foi curtida"})

}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
}