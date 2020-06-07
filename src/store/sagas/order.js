import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  }
  catch(error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try{
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    const res = yield axios.get('orders.json' + queryParams);
    const orders = [];
    for (let key in res.data) {
      orders.push({
        ...res.data[key],
        id: key
      });
    }

    yield put(actions.fetchOrdersSuccess(orders));
  }
  catch(error) {
    yield put(actions.fetchOrdersFail(error));
  }
}