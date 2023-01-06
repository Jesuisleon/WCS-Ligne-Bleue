import { createContext, useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfo, setUserInfo] = useState(Cookies.get("firstName") || null);

  const setUserTokenCookie = useCallback(
    (token, firstName, lastName, email, isAdmin) => {
      if (token) {
        Cookies.set("userToken", token, {
          expires: 1 / 24,
        });
        Cookies.set("firstName", firstName, {
          expires: 1 / 24,
        });
        Cookies.set("lastName", lastName, {
          expires: 1 / 24,
        });
        Cookies.set("email", email, {
          expires: 1 / 24,
        });
        Cookies.set("isAdmin", isAdmin, {
          expires: 1 / 24,
        });

        setUserToken(token);
        setUserInfo(firstName);
      } else {
        Cookies.remove("userToken");
        setUserToken(null);
        Cookies.remove("firstName");
        setUserInfo(null);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      setUserTokenCookie,
      setUserInfo,
      userToken,
      userInfo,
    }),
    [setUserTokenCookie, userToken, setUserInfo, userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
