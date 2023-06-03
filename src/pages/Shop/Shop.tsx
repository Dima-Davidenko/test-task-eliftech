import React from 'react';
import ShopList from '../../components/ShopList/ShopList';
import ProductList from '../../components/ProductList/ProductList';

type Props = {};

const Shop = (props: Props) => {
  return (
    <div>
      <ShopList />
      <ProductList />
    </div>
  );
};

export default Shop;
