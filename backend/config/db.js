// importação do middleware
const mongoose = require("mongoose");

// puxando os dados do usuario do "dotenv"
const dbUser = process.env.DB_USER
const dbPassaword = process.env.DB_PASS


const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassaword}@cluster0.eh1gm.mongodb.net/?retryWrites=true&w=majority`);

        console.log("Conectou ao banco!");


        return dbConn;
    } catch (error) {
        console.log(error)
    }
};

 conn();

 module.exports = conn;

