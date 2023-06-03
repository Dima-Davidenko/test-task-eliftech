import React, { useEffect, useState } from 'react';
import { shopList } from '../../types/types';
import { getShopList } from '../../utils/shopsApi';
import ShopCard from '../ShopCard/ShopCard';

type Props = {};

const ShopList = (props: Props) => {
  const [shopList, setShopList] = useState<shopList[] | []>([]);

  useEffect(() => {
    getShopList().then(shops => {
      setShopList(shops);
    });
  }, []);

  return (
    <div>
      <p>Shop List:</p>
      <ul>
        {shopList.map(({ id, shopName, logo }) => {
          return (
            <li key={id}>
              <ShopCard id={id} shopName={shopName} logo={logo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShopList;
