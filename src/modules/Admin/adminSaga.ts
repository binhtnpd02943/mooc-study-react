import { all, call, fork, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCustomError } from '../../shared/api/aloApi';
import shoppingApi from '../../shared/api/shoppingApi';
import { Products } from '../../shared/model';
import { productFormActions } from './adminSlice';

function* createProducts(action: PayloadAction<Products>) {
  try {
    if (productFormActions.addProductRequest.match(action)) {
      const response = yield call(shoppingApi.addProduct, action.payload);
      yield put(productFormActions.addProductSuccess(response));
    }
  } catch (error) {
    yield put(productFormActions.addProductFailed(getCustomError(error)));
  }
}

function* updateProducts(action: PayloadAction<Products>) {
  try {
    if (productFormActions.editProductRequest.match(action)) {
      const response = yield call(shoppingApi.updateProduct, action.payload);

      yield put(productFormActions.editProductSuccess(response));
    }
  } catch (error) {
    yield put(productFormActions.editProductFailed(getCustomError(error)));
  }
}

function* watchFetchRequest() {
  yield takeLatest(productFormActions.addProductRequest.type, createProducts);
  yield takeLatest(productFormActions.editProductRequest.type, updateProducts);
}

export default function* productFormSaga() {
  yield all([fork(watchFetchRequest)]);
}
