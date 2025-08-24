
import React from "react"
import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
 

 return(
  <>
     <h1>hello ji kese hoo</h1>
     <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
  </>

 )
}

export default App
  


