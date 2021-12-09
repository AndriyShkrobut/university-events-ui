import { useContext, useState } from "react";
import AuthContext, { Auth } from "context/auth-context";

export function useProvideAuth(): Auth {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true);

  const logout = () => setIsLoggedIn(false);

  return { isLoggedIn, login, logout };
}

function useAuth(): Auth {
  return useContext(AuthContext);
}

export default useAuth;
