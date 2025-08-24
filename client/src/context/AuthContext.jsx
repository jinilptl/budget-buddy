import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const API_URL = "http://localhost:4000/api/v1";

  const[user,setUser]=useState('')

  useEffect(()=>{
  console.log("user has been updated:", user);

  },[user])
  

  async function registerUser(formData) {
    try {
      console.log("formdata in the register function", formData);
      const ApiData = {
        name: formData.name,
        password: formData.password,
        email: formData.email,
      };

      console.log("apidta is ", ApiData);

      const {data} = await axios.post(`${API_URL}/users/register`, ApiData, {
        withCredentials: true,
      });

      // console.log("response from the register api", data.data.user);
      setUser(data.data.user)
      console.log('user is in register',data.data.user);

    } catch (error) {
      console.error("Error registering user:", error);
    }
  }


  async function loginUser(formdata) {
   
  }

  let Authvalue = { registerUser,loginUser };

  return (
    <AuthContext.Provider value={Authvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
