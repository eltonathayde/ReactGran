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

 const  authService = {
    register,
    logout
 }

 
 export default authService