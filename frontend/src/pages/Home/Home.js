import "./Home.css"

// Componets 

import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom"

//  hooks 

import { useEffect } from "react"
import {useSelector,useDispatch} from "react-redux"
import { useResetComponetMessage } from "../../hooks/useResetComponetMessage"


// redux

import { getPhotos,like } from "../../slice/photoSlice"

const Home = () => {
 
const dispatch = useDispatch()

const resetMessage= useResetComponetMessage()

const { user } = useSelector((state) =>state.auth)
const {photos, loading} = useSelector((state)=> state.photo)

//  carregando todas as fotos 

useEffect(()=>{

    dispatch(getPhotos())
},[dispatch])

// like a photo 

const handleLike = (photo) => {

   dispatch(like(photo._id))

   resetMessage()
}

if(loading){

}

  return (
    <div>Home</div>
  )
}

export default Home