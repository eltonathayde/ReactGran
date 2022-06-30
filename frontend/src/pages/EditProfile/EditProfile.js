import "./EditProfile.css"

import { uploads } from "../../utils/config"


// Hooks
import {useEffect, useState} from  'react'
import {useSelector, useDispatch} from 'react-redux'

// Redux 
import { profile,resetMassage } from "../../slice/userSlice"

// Componentes
import Message from "../../components/Message"
 
const EditProfile = () => {
    const dispatch = useDispatch()

    const {user, message , error, loading} = useSelector((state) => state.user)

    // states
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [profileImage,setImageProfile] = useState("")
    const [bio,setBio] = useState("")
    const [previewImage,setPreiewImage]= useState("")

    // carregando o dados do usuario
    useEffect(() => {
        dispatch(profile())
    },[dispatch])


    // Preenchendo o formulario com os dados do usuario
        useEffect(()=>{

            if(user){
                setName(user.name)
                setEmail(user.email)
                setBio(user.bio)
            }
        })



    const handleSubmit = (e) => {
        e.preventDefault()
    }


  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imgagem de perfil e conte mais sobre você...</p>
        {/* {previu da imagem } */}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder="E-mail" disabled value={email||""}/>
            <label>
                <span>Imagem do Perfil:</span>
                <input type="file"/>
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio|| ""}/>
            </label>
            <label>
                 <span>Quer alterar sua senha?</span>
                 <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
            </label>
             <input type="submit" value="Atualizar"/>
        </form>

    </div>
  )
}

export default EditProfile