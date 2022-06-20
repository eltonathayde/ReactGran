 const {validationResult} = require("express-validator")

const validate = (req,res,next)=>{

    const erros = validationResult(req)
    
    // se não tiver erros, segue para proxima etapa

    if(erros.isEmpty()){
        return next()
    }
    const extractedErros= []

    erros.array().map((err)=> extractedErros.push(err.msg))


    return res.status(422).json({
        erros:extractedErros
    });

}
module.exports = validate;