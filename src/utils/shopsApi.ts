import axios from 'axios';
import { shopInfo, shopList } from '../types/types';

const shopsApiUrl = 'https://647adb79d2e5b6101db0956b.mockapi.io';

export const getShopList = async () => {
  const { data } = await axios.get<shopList[]>(`${shopsApiUrl}/shopList`);
  return data;
};

export const getShopInfoById = async (shopId: string) => {
  const { data } = await axios.get<shopInfo[]>(`${shopsApiUrl}/shopInfo`, {
    params: { shopId },
  });
  return data[0] || [];
};
