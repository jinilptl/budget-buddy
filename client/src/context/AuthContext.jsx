import { createContext, useEffect, useState } from "react";
import { registerApi } from "../services/authServices";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // for debugging
  useEffect(() => {
    if (user) {
      console.log("✅ User updated:", user);
    }
  }, [user]);

  // register user function
  async function registerUser(formData) {
    try {
      const response = await registerApi(formData);
      return response; 
    } catch (error) {
      throw error;
    }
  }

  const AuthValue = { user, setUser, registerUser };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
