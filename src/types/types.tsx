export interface shopList {
  id: string;
  shopName: string;
  logo: string;
}
export interface product {
  id: string;
  name: string;
  price: string;
}
export interface shopInfo {
  id: string;
  shopId: string;
  shopName: string;
  productList: product[];
}

export interface shoppingCartItem extends product {
  shopId: string;
}

export interface shoppingCart {
  productList: shoppingCartItem[];
}
