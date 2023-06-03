import { createSlice } from '@reduxjs/toolkit';
import { shoppingCart, shoppingCartItem } from '../../types/types';

const initialState: shoppingCart = {
  productList: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, { payload }: { payload: shoppingCartItem }) => {
      return { productList: [...state.productList, payload] };
    },
    removeItem: (
      state,
      {
        payload,
      }: {
        payload: {
          shopId: string;
          id: string;
        };
      }
    ) => {
      const filteredState = state.productList.filter(cartItem => {
        return cartItem.shopId !== payload.shopId && cartItem.id !== payload.id;
      });
      return { productList: [...filteredState] };
    },
  },
});

export const { addItem, removeItem } = shoppingCartSlice.actions;

export const shoppingCartReducer = shoppingCartSlice.reducer;
