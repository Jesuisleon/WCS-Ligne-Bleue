import { createContext, useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [getUser, setGetUser] = useState(Cookies.get("firstName") || null);

  const setUserTokenCookie = useCallback((token, firstName) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 24,
      });
      Cookies.set("firstName", firstName, {
        expires: 1 / 24,
      });
      setUserToken(token);
      setGetUser(firstName);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      Cookies.remove("firstName");
      setGetUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      setUserTokenCookie,
      setGetUser,
      userToken,
      getUser,
    }),
    [setUserTokenCookie, userToken, setGetUser, getUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
