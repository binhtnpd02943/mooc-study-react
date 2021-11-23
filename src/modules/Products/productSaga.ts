import { all, call, debounce, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCustomError } from '../../shared/api/aloApi';
import shoppingApi from '../../shared/api/shoppingApi';
import { ListParams, Products } from '../../shared/model';
import { mealActions, selectProductFilter } from './productSlice';

function* fetchFoodOrderList(action: PayloadAction<ListParams>) {
  try {
    const response = yield call(shoppingApi.getAll, action.payload);
    const transformedProduct: Products[] = [];

    for (const key in response) {
      const productObj = {
        id: key,
        ...response[key],
      };
      transformedProduct.push(productObj);
    }
    yield put(mealActions.fetchFoodOrderSuccess(transformedProduct));
  } catch (error) {
    yield put(mealActions.fetchFoodOrderFailed(getCustomError(error)));
  }
}

function* handlerSearchDebounce(action: PayloadAction<ListParams>) {
  console.log('Student saga debounce', action.payload);

  yield put(mealActions.setFilter(action.payload));
}

function* deleteProducts(action) {
  try {
    if (mealActions.deleteProductRequest.match(action)) {
      const response = yield call(shoppingApi.removeProduct, action.payload.id);
      yield put(mealActions.deleteProductSuccess(response));

      //Toast success
      toast.success('Delete product successfully!');

      const filter = yield select(selectProductFilter);
      yield put(mealActions.fetchFoodOrderRequest(filter));
    }
  } catch (error) {
    yield put(mealActions.deleteProductFailed(getCustomError(error)));
  }
}

function* watchGetRequest() {
  // watch fetch student action
  yield takeLatest(mealActions.fetchFoodOrderRequest.type, fetchFoodOrderList);
  yield takeLatest(mealActions.deleteProductRequest.type, deleteProducts);
  yield debounce(500, mealActions.setFilterWithDebounce.type, handlerSearchDebounce);
}

export default function* foodOrderSaga() {
  yield all([fork(watchGetRequest)]);
}
