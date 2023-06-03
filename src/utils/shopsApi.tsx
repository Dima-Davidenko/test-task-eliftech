import axios from 'axios';
import { productList, shopList } from '../types/types';

axios.defaults.baseURL = 'https://647adb79d2e5b6101db0956b.mockapi.io';

export const getShopList = async () => {
  const { data } = await axios.get<shopList[]>('/shopList');
  return data;
};

export const getProductListByShopId = async (shopId: string) => {
  const { data } = await axios.get<productList>('/productList', { params: { shopId } });
  return data;
};
