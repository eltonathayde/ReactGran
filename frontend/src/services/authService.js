import{api,requestConfig} from "../utils/config"

// Registrando usuario no sistema 

const register = async(data) => {

    const config = requestConfig("POST", data)

    try {
        
        const res =  await fetch(api + "/users/register", config).then((res) => res.json()).catch((err)=> err)
        
//  salvando as informações no localStorage
        if(res){
            localStorage.setItem("user",JSON.stringify(res))
        }

        return res;

    } catch (error) {
        console.log(error)
    }

}

// Logout do usuario

const logout = () => {
    localStorage.removeItem("user")
}

// login do usuario

const login = async(data)=>{
    // configuração de envio de dados 

    const config = requestConfig("POST",data)
 try {
    const res = await fetch(api +"/users/login",config).then((res)=> res.json()).catch((err) =>(err))
    


    if(res._id){
        localStorage.setItem("user",JSON.stringify(res))
    }
    return res
    
 } catch (error) {
    console.log(error)
 }
}

 const  authService = {
    register,
    logout,
    login
 }

 
 export default authService