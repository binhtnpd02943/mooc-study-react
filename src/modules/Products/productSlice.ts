import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomError } from '../../shared/api/aloApi';
import { ListParams, Products } from '../../shared/model';
import { RootState } from '../../store/store';

export interface FoodOrderState {
  loading: boolean;
  response: any;
  error: string;
  list: Products[];
  filter: ListParams;
}

const initialState: FoodOrderState = {
  loading: false,
  list: [],
  response: null,
  error: '',
  filter: {
    orderBy: `"name"`,
  },
};

const getProduct = (state: FoodOrderState, selectedProduct: Products): Products[] =>
  state.list.map((product: Products) =>
    product.id === selectedProduct.id ? { ...product, quantity: product.quantity - 1 } : product
  );

const mealSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchFoodOrderRequest(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchFoodOrderSuccess(state, action: PayloadAction<Products[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchFoodOrderFailed(state, action: PayloadAction<CustomError>) {
      state.loading = false;
    },
    addCartSuccess(state, action) {
      state.loading = false;
      state.list = getProduct(state, action.payload);
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    deleteProductRequest(state, action) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.response = action.payload;
    },
    deleteProductFailed(state, action) {
      state.loading = false;
    },
  },
});

//Action
export const mealActions = mealSlice.actions;

//Selector;
export const selectProductFilter = (state: RootState) => state.products.list;

//Reducers
const mealReducer = mealSlice.reducer;
export default mealReducer;
