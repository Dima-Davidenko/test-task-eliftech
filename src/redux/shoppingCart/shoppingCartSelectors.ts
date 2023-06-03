import { RootState } from '../store';

export const selectShoppingCartList = (s: RootState) => {
  return s.shoppingCart.productList;
};

export const selectShopInCart = (s: RootState) => {
  return s.shoppingCart.shopId;
};
