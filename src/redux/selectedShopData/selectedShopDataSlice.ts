import { createSlice } from '@reduxjs/toolkit';
import { shopInfo } from '../../types/types';

const initialState: shopInfo = {
  id: '',
  productList: [],
  shopCoords: null,
  shopId: '',
  shopName: '',
};

const selectedShopDataSlice = createSlice({
  name: 'selectedShopData',
  initialState,
  reducers: {
    updateSelectedShopData: (_, { payload }: { payload: shopInfo }) => {
      return { ...payload };
    },
    updateSelectedShopId: (state, { payload }: { payload: string }) => {
      return { ...state, shopId: payload };
    },
    resetClientData: () => initialState,
  },
});

export const { updateSelectedShopData, updateSelectedShopId } = selectedShopDataSlice.actions;

export const selectedShopDataReducer = selectedShopDataSlice.reducer;
