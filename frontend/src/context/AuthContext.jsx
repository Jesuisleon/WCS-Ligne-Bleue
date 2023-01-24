import { createContext, useState, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfos, setUserInfos] = useState({});
  const [checkBoxFilter, setCheckBoxFilter] = useState("");

  const setUserTokenCookie = useCallback((token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 24 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      checkBoxFilter,
      setCheckBoxFilter,
      setUserTokenCookie,
      userToken,
      userInfos,
      setUserInfos,
    }),
    [userToken, userInfos, checkBoxFilter]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
