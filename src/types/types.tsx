export interface shopList {
  id: string;
  shopName: string;
  logo: string;
}
export interface product {
  name: string;
  price: string;
}
export interface productList {
  id: string;
  shopId: string;
  productList: product[];
}
