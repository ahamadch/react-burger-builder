import { put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';

function logout(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('userId');
  yield localStorage.removeItem('expirationDate');
  yield put ({
    type: actionTypes.AUTH_LOGOUT,
  })
}