import "./Search.css"


// hooks 

import { useEffect } from "react"
import  {useSelector, useDispatch} from "react-redux"
import { useResetComponetMessage  } from "../../hooks/useResetComponetMessage"
import { useQuery } from "../../hooks/useQuery"

//  Componets

import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom"

// redux 
 
 const Search = () => {
   return (
     <div>Search</div>
   )
 }
 
 export default Search