import React, { useEffect, useState } from 'react';
import { shopList } from '../../types/types';
import { getShopList } from '../../utils/shopsApi';
import ShopCard from '../ShopCard/ShopCard';
import { useSelector } from 'react-redux';
import { selectShopInCart } from '../../redux/shoppingCart/shoppingCartSelectors';

type Props = {
  setselectedShopId: (id: string) => void;
};

const ShopList = ({ setselectedShopId }: Props) => {
  const [shopList, setShopList] = useState<shopList[] | []>([]);
  const shopInCartId = useSelector(selectShopInCart);

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
          if (shopInCartId) {
            return (
              <li key={id}>
                <ShopCard
                  id={id}
                  shopName={shopName}
                  logo={logo}
                  setselectedShopId={setselectedShopId}
                  disabled={shopInCartId !== id}
                />
              </li>
            );
          } else {
            return (
              <li key={id}>
                <ShopCard
                  id={id}
                  shopName={shopName}
                  logo={logo}
                  setselectedShopId={setselectedShopId}
                  disabled={false}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ShopList;
