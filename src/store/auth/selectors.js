import { createSelector } from "reselect";
const get = (state) => state.auth;
export const authState = createSelector(get, (auth) => auth);
