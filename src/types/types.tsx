export interface shopList {
  id: string;
  shopName: string;
  logo: string;
}
export interface product {
  name: string;
  price: string;
}
export interface shopInfo {
  id: string;
  shopId: string;
  shopName: string;
  productList: product[];
}
