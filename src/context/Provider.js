import React, { createContext } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState("light");
  const [token, setToken] = React.useState("jiizipzje");

  return (
    <GlobalContext.Provider
      value={{ isLoaded, setIsLoaded, theme, setTheme, token, setToken }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
