import { createSelector, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../types/auth";
import { RootState } from "./store";

const initialState: IAuth = {
  access_token: null,
  expires_in: null,
  id_token: null,
  refresh_token: null,
  scope: null,
  token_type: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
      state.id_token = action.payload.id_token;
      state.refresh_token = action.payload.refresh_token;
      state.scope = action.payload.scope;
      state.token_type = action.payload.token_type;
    },
    clearAuth: (state) => {
      state.access_token = initialState.access_token;
      state.expires_in = initialState.expires_in;
      state.id_token = initialState.id_token;
      state.refresh_token = initialState.refresh_token;
      state.scope = initialState.scope;
      state.token_type = initialState.token_type;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const getAccessToken = createSelector(
  [
    (state: RootState) => state.auth.access_token,
    (state: RootState) => state.auth.token_type,
  ],
  (accessToken, tokenType) =>
    accessToken ? `${tokenType} ${accessToken}` : null
);

export const getIdToken = createSelector(
  [(state: RootState) => state.auth.id_token],
  (idToken) => idToken
);

export default authSlice.reducer;
