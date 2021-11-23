import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../shared/model/user';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  logging?: boolean;
  isLeave?: boolean;
  currentUser?: User;
  response: any;
}

const init = localStorage.getItem('access_token');

axios.defaults.headers.common['Authorization'] = init;

export interface LoginPayload {
  email?: string;
  password?: string;
  returnSecureToken: boolean;
}
export interface SetIsLeave {
  isLeave: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!init,
  logging: false,
  isLoading: false,
  isLeave: false,
  currentUser: undefined,
  response: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLeave(state, action: PayloadAction<SetIsLeave>) {
      state.isLeave = action.payload.isLeave;
    },
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
      state.logging = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.logging = false;
      state.isLeave = true;
      state.currentUser = action.payload;
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.isLeave = false;
    },
    singUpRequest(state, action) {
      state.isLoading = true;
    },
    singUpSuccess(state, action) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.logging = false;
      state.isLeave = true;
    },
    singUpFailed(state, action) {
      state.isLoading = false;
      state.isLeave = false;
    },
    updateUserRequest(state, action) {
      state.isLoading = true;
    },
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.logging = false;
      state.isLeave = true;
      state.currentUser = action.payload;
    },
    updateUserFailed(state, action) {
      state.isLoading = false;
      state.isLeave = false;
      state.logging = false;
    },
    getUserRequest(state, action) {
      state.isLoading = true;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.response = action.payload;
    },
    getUserFailed(state, action) {
      state.isLoading = false;
    },
  },
});
export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
