import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoppingCartList } from '../../redux/shoppingCart/shoppingCartSelectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { removeItem } from '../../redux/shoppingCart/shoppingCartSlice';

type Props = {};

const ShoppingCartList = (props: Props) => {
  const shoppingCartList = useSelector(selectShoppingCartList);
  const dispatch = useTypedDispatch();
  const onBtnRemoveClick = (id: string, shopId: string) => {
    dispatch(removeItem({ shopId, id }));
  };

  return (
    <ul>
      {shoppingCartList.map(({ name, price, id, shopId, quantity }) => {
        return (
          <li key={id + shopId}>
            <p>{name}</p>
            <p>{price}</p>
            <p>{quantity}</p>
            <button onClick={() => onBtnRemoveClick(id, shopId)}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ShoppingCartList;
