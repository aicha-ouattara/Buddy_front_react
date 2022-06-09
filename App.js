import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/index";
import Nav from "./src/navigation/nav";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f14d53",
    accent: "#fcc5c4",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <Nav />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}
