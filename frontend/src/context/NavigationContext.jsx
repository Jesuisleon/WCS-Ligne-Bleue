import { createContext, useState, useMemo } from "react";

export const NavigationContext = createContext();

export function NavigationContextProvider({ children }) {
  const [navigationTitle, setNavigationTitle] = useState("accueil");

  const [navigationTheme, setNavigationTheme] = useState("");

  const value = useMemo(
    () => ({
      navigationTheme,
      setNavigationTheme,
      navigationTitle,
      setNavigationTitle,
    }),
    [navigationTitle, navigationTheme]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
