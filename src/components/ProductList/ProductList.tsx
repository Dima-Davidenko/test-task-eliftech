import { useEffect, useState } from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addItem } from '../../redux/shoppingCart/shoppingCartSlice';
import { product } from '../../types/types';
import { getShopInfoById } from '../../utils/shopsApi';
import { useSelector } from 'react-redux';
import {
  selectSelectedShopName,
  selectSelectedShopProductList,
} from '../../redux/selectedShopData/selectedShopDataSelectors';

type Props = {
  selectedShopId: string;
};

const ProductList = ({ selectedShopId }: Props) => {
  const productList = useSelector(selectSelectedShopProductList);
  const shopName = useSelector(selectSelectedShopName);
  const dispatch = useTypedDispatch();

  const onBtnBuyClick = (name: string, id: string, price: string) => {
    dispatch(addItem({ shopId: selectedShopId, id, name, price, quantity: 1 }));
  };

  return (
    <div>
      {!selectedShopId && <p>Please choose a shop</p>}
      {selectedShopId && <p>{shopName}</p>}
      <ul>
        {productList.map(({ name, price, id }) => {
          return (
            <li key={name}>
              <div>
                {name}: {price}
              </div>
              <button onClick={() => onBtnBuyClick(name, id, price)}>Buy</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
