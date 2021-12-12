import { useContext } from "react";
import AuthContext, { AuthContextType } from "context/auth.context";

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export default useAuth;
