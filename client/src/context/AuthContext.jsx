import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let Authvalue = {};

  return (
    <AuthContext.Provider value={Authvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
