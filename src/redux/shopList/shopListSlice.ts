import { createSlice } from '@reduxjs/toolkit';
import { shopList } from '../../types/types';

const initialState: { shops: shopList[] | null } = {
  shops: null,
};

const shopListSlice = createSlice({
  name: 'shopList',
  initialState,
  reducers: {
    updateShopList: (_, { payload }: { payload: shopList[] }) => {
      return { shops: payload };
    },
  },
});

export const { updateShopList } = shopListSlice.actions;

export const shopListReducer = shopListSlice.reducer;
