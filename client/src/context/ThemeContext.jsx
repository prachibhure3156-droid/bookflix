import React, { createContext, useContext, useEffect, useState } from "react";
const C = createContext(null);
export function ThemeProvider({children}) {
  const [dark, setDark] = useState(() => localStorage.getItem("bookflix_theme") !== "light");
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; localStorage.setItem("bookflix_theme", dark ? "dark" : "light"); }, [dark]);
  return <C.Provider value={{dark, toggle: () => setDark(v => !v)}}>{children}</C.Provider>;
}
export const useTheme = () => useContext(C);
