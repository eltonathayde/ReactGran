import "./Auth.css"

// Components
import {Link} from "react-router-dom"
import Message from "../../components/Message"

// Hooks 
import { useState, useEffect } from "react"
import {useSelector, useDispatch}  from "react-redux"



// Redux

import { register, reset } from "../../slice/authSlice"



const Register = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword, setConfimPassword] = useState("")


  const dispatch = useDispatch()

  const {loading, error} =  useSelector((state) => state.auth)


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);

    dispatch(register(user))
  }

// limpando todos o estados
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>FanáticosGran</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
        <input type="email" placeholder="E-email" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input  type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
        <input type="password" placeholder="Confirme sua senha" onChange={(e) => setConfimPassword(e.target.value)} value={confirmPassword || ""}/>
        {!loading && <input type="submit" value="Cadastrar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message msg={error} type="error" /> }
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register