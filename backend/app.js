 require("dotenv").config()
 
 const express = require("express");
 const path = require("path");
 const cors = require("cors");


 const port =process.env.PORT;

 const app = express()


// configurção de resposta de JSON E FORMDATA
app.use(express.json())
app.use(express.urlencoded({extended: false}));


// resvolvendo problema do cors
app.use(cors({igincredentials:true, origin: "http://localhost:3000" }));


// diretorio de upload

app.use("/uploads",express.static(path.join(__dirname,"/uploads")));



// DB conexão
require("./config/db.js")


// rotas
 const router = require("./routes/Router.js");

 app.use(router)


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})