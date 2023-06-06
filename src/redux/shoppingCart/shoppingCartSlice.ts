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
    quantityChange: (
      state,
      {
        payload,
      }: {
        payload: {
          id: string;
          quantity: number;
        };
      }
    ) => {
      const isInCart = state.productList.findIndex(({ id }) => {
        return id === payload.id;
      });

      if (isInCart === -1) {
        return state;
      } else {
        if (payload.quantity) {
          const updatedCart = state.productList.map(product => {
            return product.id === payload.id ? { ...product, quantity: payload.quantity } : product;
          });
          return { ...state, productList: updatedCart };
        } else {
          const filteredList = state.productList.filter(cartItem => {
            return cartItem.id !== payload.id;
          });
          return { shopId: filteredList.length ? state.shopId : '', productList: filteredList };
        }
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
      const filteredList = state.productList.filter(cartItem => {
        return cartItem.id !== payload.id;
      });
      return { shopId: filteredList.length ? state.shopId : '', productList: [...filteredList] };
    },
    resetShoppingCart: () => initialState,
  },
});

export const { addItem, removeItem, resetShoppingCart, quantityChange } = shoppingCartSlice.actions;

export const shoppingCartReducer = shoppingCartSlice.reducer;
