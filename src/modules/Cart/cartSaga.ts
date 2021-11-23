import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCustomError } from '../../shared/api/aloApi';
import cartApi from '../../shared/api/cartApi';
import shoppingApi from '../../shared/api/shoppingApi';
import { CartItem, ListResponse } from '../../shared/model';
import { cartActions } from './cart-slice';

// function* fetchCartData(action) {
//   try {
//   } catch (error) {}
// }

// function* fetchCartData(action) {
//   try {
//     const response = yield call(shoppingApi.getCart);

//     const loadedMeals: any = [];

//     for (const key in response) {
//       loadedMeals.push({
//         id: key,
//         name: response[key].name,
//         quantity: response[key].quantity,
//         price: response[key].price,
//       });
//     }
//     yield put(cartActions.fetchCartSuccess(loadedMeals));
//   } catch (error) {
//     yield put(cartActions.fetchCartFailed(getCustomError(error)));
//   }
// }

function* sendAddCart(action: PayloadAction<CartItem>) {
  try {
    if (cartActions.addCartRequest.match(action)) {
      const response = yield call(cartApi.addCart, action.payload);
      const cartInfo = yield call(cartApi.getCartId, response.name);
      console.log(cartInfo[response.name]);

      yield put(cartActions.addCartSuccess(cartInfo[response.name]));
      // console.log(response);

      // yield put(cartActions.addCartSuccess(response));
    }
  } catch (error) {
    yield put(cartActions.addCartFailed(getCustomError(error)));
  }
}

function* watchGetRequest() {
  // watch fetch cart action
  // yield takeLatest(cartActions.fetchCartRequest.type, fetchCartData);
  yield takeLatest(cartActions.addCartRequest.type, sendAddCart);
}

export default function* cartSaga() {
  yield all([fork(watchGetRequest)]);
}
