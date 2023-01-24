import { createContext, useState, useMemo } from "react";

export const NavigationContext = createContext();

export function NavigationContextProvider({ children }) {
  const [navigationTitle, setNavigationTitle] = useState("accueil");

  const value = useMemo(
    () => ({
      navigationTitle,
      setNavigationTitle,
    }),
    [navigationTitle]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
