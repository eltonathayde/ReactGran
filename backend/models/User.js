// importção de middlewares
const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema(
    {
        name:String,
        email:String,
        password:String,
        profileImage:String,
        bio:String,
    },
    {
        // quando tem uma criação de usuario ou atualização, a data e  a hora é marcada
        timestamps:true
    }
);

// defenindo um model e passando um schema
const User = mongoose.model("User",userSchema);

module.exports = User;

