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
  shopCoords: google.maps.LatLngLiteral | null;
}

export interface shoppingCartItem extends product {
  shopId: string;
  quantity: number;
}

export interface shoppingCart {
  shopId: string;
  productList: shoppingCartItem[];
}

export interface clientData {
  contacts: {
    name: string;
    email: string;
    phone: string;
    address: string;
    selectedAddress: string;
    selectedMarkerPosition: google.maps.LatLngLiteral | null;
  };
}
export interface directionProps {
  distance: string | undefined;
  duration: string | undefined;
}
