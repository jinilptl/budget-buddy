
import React from "react"
import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedWrapper from "./pages/ProtectedWrapper"
import Logout from "./pages/Logout"
import AddTransaction from "./pages/AddTransaction"

function App() {
 

 return(
  <>
    
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={
         <ProtectedWrapper>
           <Home/>
         </ProtectedWrapper>
      }/>

      <Route path="/logout" element={
         <ProtectedWrapper>
           <Logout/>
         </ProtectedWrapper>
      }/>

      <Route path="/add-transaction" element={
         <ProtectedWrapper>
           <AddTransaction/>
         </ProtectedWrapper>
      }/>
     </Routes>
  </>

 )
}

export default App
  


