import React, { useState } from 'react';
import ShopList from '../../components/ShopList/ShopList';
import ProductList from '../../components/ProductList/ProductList';

type Props = {};

const Shop = (props: Props) => {
  const [selectedShopId, setselectedShopId] = useState<string>('');
  return (
    <div>
      <ShopList setselectedShopId={setselectedShopId} />
      <ProductList selectedShopId={selectedShopId} />
    </div>
  );
};

export default Shop;
