 import "./Message.css"

 import React from 'react'
 
 const Message = ( msg,type) => {
   return (
     <div className={`massage ${type}`}>
        <p>{msg}</p>
     </div>
   )
 }
 
 export default Message