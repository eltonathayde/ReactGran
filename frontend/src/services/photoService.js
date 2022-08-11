import {api, requestConfig} from  '../utils/config'

// publicar um foto do usuario

const publishPhoto = async(data,token) => {
    const config = requestConfig("POST", data, token, true)

    try {
        
        const res = await fetch(api + "/photos", config).then((res)=> res.json()).catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
    }
}

// regatando fotos do usuario

const getUserPhotos = async(id,token) =>{

    const config = requestConfig("GET", null, token)
    try {
        const res = await fetch(api + "/photos/user/" + id, config).then((res) =>  res.json()).catch((err) => err)

        return res
    } catch (error) {

        console.log(error)
    }
}

//  deletando uma foto

const deletePhoto = async(id,token) =>{
    
    const config = requestConfig("DELETE",null,token)

    try {
     const res = await fetch(api + "/photos/" + id ,config).then((res)=> res.json()).catch((err) => err)

     return res
    } catch (error) {
        console.log(error)
    }
}
// atualizadando uma foto 

const updatePhoto = async(data,id, token) => {
     
    const config = requestConfig("PUT",data,token)

    try {
        
        const res = await fetch(api + "/photos/" + id, config).then((res) => res.json()).catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
    }
}

// pegando a photo atraves do id
const getPhoto = async (id, token) => {
     
    const config = requestConfig("GET",null, token)

    try {
        
        const res = await fetch(api + "/photos/" + id , config).then((res) => res.json()).catch((err) => err)

        return res

    } catch (error) {
        
        console.log(error)
    }
}

// função de like 

const like = async(id,token) => {

    const config = requestConfig("PUT", null, token)

    try {
        
        const res = await fetch(api + "/photos/like/" + id, config).then((res)=> res.json()).catch((err) => err)
        
        return res

    } catch (error) {
        console.log(error)
    }
}

// adicionando um comentario a foto 

const comment = async (data, id ,token) => {

    const config = requestConfig("PUT", data , token )
    try {
        
         const res = await fetch(api+'/photos/comment/'+ id , config).then((res)=> res.json()).catch((err)=> err)

         return res

    } catch (error) {
        console.log(error)
        }

}

// pegando todas as fotos 

const getPhotos = async() => {

    const config = requestConfig("GET")

    try {
        
        const res = await (await fetch(api + "/photos", config).then((res)=>res.json)).catch(err => err)

        return res

    } catch (error) {
        console.log(error)
    }
}



const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos
}

export default photoService;