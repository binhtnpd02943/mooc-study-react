import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomError } from '../../shared/api/aloApi';
import { CartItem } from '../../shared/model';

export interface CartState {
  loading: boolean;
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  loading: false,
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartRequest(state, action) {
      state.loading = true;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCartFailed(state, action) {
      state.loading = false;
    },

    replaceCart(state, action) {
      state.totalAmount = action.payload;
      state.items = action.payload;
    },
    addCartRequest(state, action) {
      state.loading = true;
    },
    addCartSuccess(state, action) {
      state.loading = false;
      const updateTotalAmount: number =
        state.totalAmount + action.payload.price * action.payload.quantity;

      const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      state.items = updatedItems;
      state.totalAmount = updateTotalAmount;
    },

    addCartFailed(state, action: PayloadAction<CustomError>) {
      state.loading = false;
    },

    removeCartRequest(state, action) {
      state.loading = true;
    },
    removeCartSuccess(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingCartItemIndex];
      const updateTotalAmount: number = state.totalAmount - existingItem.price;
      let updatedItems;

      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.items = updatedItems;
      state.totalAmount = updateTotalAmount;
    },
    removeCartFailed(state, action) {
      state.loading = false;
    },
    clearCart(state, action) {
      state.loading = false;
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

//Actions
export const cartActions = cartSlice.actions;

//Selector

// Reducers
const cartReducer = cartSlice.reducer;
export default cartReducer;
