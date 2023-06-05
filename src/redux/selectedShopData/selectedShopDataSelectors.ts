import { RootState } from '../store';

export const selectSelectedShopProductList = (s: RootState) => {
  return s.selectedShopData.productList;
};

export const selectSelectedShopCoords = (s: RootState) => {
  return s.selectedShopData.shopCoords;
};

export const selectSelectedShopId = (s: RootState) => {
  return s.selectedShopData.shopId;
};

export const selectSelectedShopName = (s: RootState) => {
  return s.selectedShopData.shopName;
};
