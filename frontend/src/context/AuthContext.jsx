import { createContext, useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userFirstName, serUserFirstName] = useState("non");
  const [userLastName, setUserLastName] = useState("blabla");

  const setUserTokenCookie = useCallback((token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      userFirstName,
      serUserFirstName,
      userLastName,
      setUserLastName,
      setUserTokenCookie,
      userToken,
    }),
    [
      setUserTokenCookie,
      userToken,
      userFirstName,
      serUserFirstName,
      userLastName,
      setUserLastName,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
