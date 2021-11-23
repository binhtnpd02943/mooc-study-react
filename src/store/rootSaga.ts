
import { all } from 'redux-saga/effects';
import productFormSaga from '../modules/Admin/adminSaga';
import authSaga from '../modules/auth/auth-saga';
import cartSaga from '../modules/Cart/cartSaga';
import foodOrderSaga from '../modules/Products/productSaga';

export default function* rootSaga(): Generator {
  yield all([foodOrderSaga(),cartSaga(),productFormSaga(),authSaga()]);
}
