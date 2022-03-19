import thunk from "redux-thunk";
import { authSlice } from "./auth/slice";
import { persistStore, persistReducer } from "redux-persist";
import {
  configureStore,
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: {
    [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
  },
  middleware: [thunk],
});
const persistor = persistStore(store);
export { store, persistor };
