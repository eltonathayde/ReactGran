import "./Profile.css"

import { uploads } from "../../utils/config"

// component
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill,BsPencilFill,BsXlg } from "react-icons/bs"


// hooks

import { useState,useEffect, useRef} from "react"
import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// redux
import { getUserDetails } from "../../slice/userSlice"
import { publishPhoto, resetMessage, getUserPhotos } from "../../slice/photoSlice"


const Profile = () => {
     const {id} = useParams()

     const dispatch = useDispatch()

     const {user,loading} = useSelector((state) => state.user)
     const {user: userAuth} = useSelector((state)=> state.auth)
     const {photos,loading:loadingPhoto,message:messagePhoto, error:errorPhoto} = useSelector((state) => state.photo)

     const [title, setTitle] = useState("")
     const [image, setImage] = useState("")

    //formulario para adicionar fotos e editar
     const newPhotoForm = useRef()
     const  editPhotoForm = useRef()

    // carregando dados do usuario
    useEffect(()=>{ 
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch,id])

    const handleFile = (e) => {
        const image = e.target.files[0]

        setImage(image)
    }

    const submitHandle = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            image
        }

        // construindo form data

        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach((key) =>
         formData.append(key, photoData[key])
         );

         formData.append("photo", photoFormData)

         dispatch(publishPhoto(formData))
         
         setImage("")

         setTimeout(() => {
            dispatch(resetMessage())
         }, 2000)

    }

    if (loading){
        return <p>Carregando...</p>
    }
    
  return (
    <div id="profile">
        <div className="profile-header">
            {user.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt ={user.name} />
            )}
            <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
        </div>
        {id === userAuth._id &&(
                <>
                <div className="new-photo" ref={newPhotoForm}>
                    <h3>Compartilhe algum momento seu:</h3>
                    <form onSubmit={submitHandle}>
                        <label>
                            <span>Título para a foto :</span>
                            <input type="text" placeholder="Insira um título" onChange={(e)=> setTitle (e.target.value)} value={title|| ""}/>
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="file" onChange={handleFile} />
                        </label>
                        {!loadingPhoto && <input type="submit" value="Postar"/>}
                        {loadingPhoto && (
                            <input type="submit" disabled value="Aguarde..."/>
                        )}
                    </form>
                </div>
                 {errorPhoto && <Message msg={errorPhoto} type="error"/>}
                 {messagePhoto && <Message msg={messagePhoto} type="success"/>}
                
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map((photos) =>(
                        <div className="photo" key={photos._id}>
                            {photos.image && (<img src={`${uploads}/photos/${photos.image}`} alt={photos.title} />)}
                            {id === userAuth._id ? (<p>actions</p>) : (<Link className="btn" to={`/photos/${photos._id}`}>Ver</Link>)}
                       </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
                </div>
            </div>
    </div>
  )
}

export default Profile