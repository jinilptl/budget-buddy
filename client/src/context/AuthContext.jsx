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
      setUser(response.user); // response structure depends on backend
      return response; // returning allows component to handle navigation
    } catch (error) {
      throw error; // propagate to component
    }
  }

  const AuthValue = { user, setUser, registerUser };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
