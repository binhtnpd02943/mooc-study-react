import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { getCustomError } from '../../shared/api/aloApi';
import userApi from '../../shared/api/userApi';
import { authActions, LoginPayload } from './auth-slice';
let logoutTimer;
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('access_token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);

    const response = yield call(userApi.login, payload);

    localStorage.setItem('access_token', response.data.idToken);
    const expirationTime = new Date(new Date().getTime() + +response.data.expiresIn * 1000);
    localStorage.setItem('expirationTime', expirationTime.toISOString());

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(handleLogout, remainingTime);

    yield put(authActions.loginSuccess(response));
    toast.success('Login Success!!');
  } catch (error) {
    yield put(authActions.loginFailed(getCustomError(error)));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  localStorage.removeItem('expirationTime');

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  // redirect to login page
  yield put(push('/login'));
}

function* createUser(action: PayloadAction<LoginPayload>) {
  try {
    const res = yield call(userApi.singUp, action.payload);
    yield put(authActions.singUpSuccess(res));
    toast.success('Sig up user Success!!');

    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      yield put(authActions.loginRequest(res));
    }
  } catch (error) {
    yield put(authActions.singUpFailed(getCustomError(error)));
  }
}

function* updateUser(action: PayloadAction<any>) {
  try {
    const tokenData = retrieveStoredToken();

    const data = {
      idToken: tokenData?.token,
      password: action.payload.password,
      returnSecureToken: false,
    };

    const res = yield call(userApi.updateUser, data);
    yield put(authActions.updateUserSuccess(res));
  } catch (error) {
    yield put(authActions.updateUserFailed(getCustomError(error)));
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.loginRequest.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
    yield takeLatest(authActions.singUpRequest.type, createUser);
    yield takeLatest(authActions.updateUserRequest.type, updateUser);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
