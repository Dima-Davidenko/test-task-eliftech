import { createSlice } from '@reduxjs/toolkit';
import { shoppingCart, shoppingCartItem } from '../../types/types';

const initialState: shoppingCart = {
  shopId: '',
  productList: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, { payload }: { payload: shoppingCartItem }) => {
      const shopId = state.shopId || payload.shopId;
      if (state.shopId && payload.shopId !== state.shopId) return state;

      const isInCart = state.productList.find(({ id, shopId }) => {
        return id === payload.id && shopId === payload.shopId;
      });

      if (!isInCart) {
        return { shopId, productList: [...state.productList, payload] };
      } else {
        const updatedCart = state.productList.map(product => {
          return product.id === payload.id && product.shopId === payload.shopId
            ? { ...product, quantity: product.quantity + payload.quantity }
            : product;
        });
        return { shopId, productList: updatedCart };
      }
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
      const newProductList = state.productList.map(product => {
        return product.id === payload.id && product.shopId === payload.shopId
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
      const filteredList = newProductList.filter(cartItem => {
        return cartItem.quantity > 0;
      });
      return { shopId: filteredList.length ? state.shopId : '', productList: [...filteredList] };
    },
  },
});

export const { addItem, removeItem } = shoppingCartSlice.actions;

export const shoppingCartReducer = shoppingCartSlice.reducer;
