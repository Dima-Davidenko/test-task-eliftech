import React, { useState } from 'react';
import ShopList from '../../components/ShopList/ShopList';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector } from 'react-redux';
import { selectShopInCart } from '../../redux/shoppingCart/shoppingCartSelectors';

type Props = {};

const Shop = (props: Props) => {
  const [selectedShopId, setselectedShopId] = useState<string>('');
  const shopInCartId = useSelector(selectShopInCart);

  const changeSelectedShop = (shopId: string) => {
    if (!shopInCartId) {
      setselectedShopId(shopId);
    }
  };
  return (
    <div>
      <ShopList setselectedShopId={changeSelectedShop} />
      <ProductList selectedShopId={selectedShopId} />
    </div>
  );
};

export default Shop;
