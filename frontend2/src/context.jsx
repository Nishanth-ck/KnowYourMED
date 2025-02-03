import { createContext, useState } from "react";

export const GlobalContext = createContext({});

function GlobalState({ children }) {
  const [lang, setLang] = useState([]);
  return (
    <GlobalContext.Provider value={{ lang, setLang }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
