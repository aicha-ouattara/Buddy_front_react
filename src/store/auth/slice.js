import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState, sliceName } from "./constants";
import { API_URL } from "@env";
import { genericFetch } from "../../api/fetchApi";
import jwt_decode from "jwt-decode";

//Fetch de l'api pour le login
export const logIn = createAsyncThunk("auth/logIn", async (body, thunkAPI) => {
  const response = await genericFetch(`${API_URL}/login`, "POST", body).then(
    (json) => json.json()
  );
  return response;
});

//Fetch de l'api pour le register
export const onSignUp = createAsyncThunk(
  "auth/Register",
  async (body, thunkAPI) => {
    genericFetch(`${API_URL}/users`, "POST", body).then((json) => json.json());
    return response;
  }
);

//Deconnxion
export const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.idUser = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(logIn.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.idUser = jwt_decode(state.token).id;
    });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
