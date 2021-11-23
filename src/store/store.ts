import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import productFormReducer from '../modules/Admin/adminSlice';
import authReducer from '../modules/auth/auth-slice';
import cartReducer from '../modules/Cart/cart-slice';
import mealReducer from '../modules/Products/productSlice';
import { history } from '../shared/helper/history';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  products: mealReducer,
  cart: cartReducer,
  auth: authReducer,
  productForm: productFormReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
