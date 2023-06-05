import { RootState } from '../store';

export const selectShopList = (s: RootState) => {
  return s.shopList.shops;
};
