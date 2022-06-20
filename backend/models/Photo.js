// importação de middlewares
const mongoose = require("mongoose")
const {Schema} = mongoose

const photoSchema = new Schema ({
    image:String,
    title:String,
    likes: Array,
    comments:Array,
    userId:mongoose.ObjectId,
    userName:String,
},{
       // quando tem uma criação de usuario ou atualização, a data e  a hora é marcada
       timestamps:true
});

const Photo = mongoose.model("Photo",photoSchema);

module.exports = Photo;

