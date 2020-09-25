import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  loginRequest,
  registerRequest,
  userRequest,
  logoutRequest,
} from "./user.requests";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

export function* getCurrentUser() {
  try {
    let user = yield userRequest();

    if (user.isAuthenticated) yield put(signInSuccess(user.user));
    else yield put(signOutSuccess());
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload }) {
  // console.log("saga signInWithEmail payload: ", payload);
  try {
    const user = yield loginRequest(payload);

    // console.log("signInWithEmail() result user:", user);

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield logoutRequest();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload }) {
  // console.log("payload", payload);
  try {
    const res = yield registerRequest(payload);

    // console.log("res", res);

    if (!res.errors) {
      yield put(signUpSuccess(res));
    } else {
      yield put(signUpFailure(res.errors));
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp(payload) {
  yield signInWithEmail(payload);
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, getCurrentUser);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
