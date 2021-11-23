import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../../shared/model';

export interface ProductFormState {
  isLoading: boolean;
  data: Products;
  response?: any;
  isLeave?: boolean;
}

export type SetIsLeave = {
  isLeave: boolean;
};

const initialState: ProductFormState = {
  isLoading: false,
  isLeave: false,
  data: {} as Products,
  response: null,
};

const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    setIsLeave(state, action: PayloadAction<SetIsLeave>) {
      state.isLeave = action.payload.isLeave;
    },
    addProductRequest(state, action) {
      state.isLoading = true;
    },
    addProductSuccess(state, action) {
      state.isLoading = false;
      state.response = action.payload;
      state.isLeave = true;
    },
    addProductFailed(state, action) {
      state.isLoading = false;
      state.isLeave = false;
    },
    editProductRequest(state, action) {
      state.isLoading = true;
    },
    editProductSuccess(state, action) {
      state.isLoading = false;
      state.response = action.payload;
      state.isLeave = true;
    },
    editProductFailed(state, action) {
      state.isLoading = false;
      state.isLeave = false;
    },
  },
});

//Action
export const productFormActions = productFormSlice.actions;

//Selector;

//Reducers
const productFormReducer = productFormSlice.reducer;
export default productFormReducer;
