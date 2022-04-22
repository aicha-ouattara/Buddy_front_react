import React, { createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState("light");
  const [token, setToken] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // useEffect(() => {
  //   getData();
  //   // removeData();
  // }, []);

  // const getData = () => {
  //   try {
  //     AsyncStorage.getItem("token").then((value) => {
  //       if (value != null) {
  //         setToken(value);
  //         console.log("valeur protected screen:", value);
  //         // navigation.navigate("Protected");
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <GlobalContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        theme,
        setTheme,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default GlobalProvider;
