import { Children, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ Children }) => {
  let Authvalue = {};

  return (
    <AuthContext.Provider value={Authvalue}>{Children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
