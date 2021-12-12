import { useContext } from "react";
import UserContext, { UserContextType } from "context/user.context";

function useUser(): UserContextType {
  return useContext(UserContext);
}

export default useUser;
