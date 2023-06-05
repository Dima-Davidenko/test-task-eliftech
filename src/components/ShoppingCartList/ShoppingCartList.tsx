import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoppingCartList } from '../../redux/shoppingCart/shoppingCartSelectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { quantityChange, removeItem } from '../../redux/shoppingCart/shoppingCartSlice';

type Props = {};

const ShoppingCartList = (props: Props) => {
  const shoppingCartList = useSelector(selectShoppingCartList);
  const dispatch = useTypedDispatch();
  const onBtnRemoveClick = (id: string, shopId: string) => {
    dispatch(removeItem({ shopId, id }));
  };
  const onQuantityChange = (id: string, quantity: number) => {
    dispatch(quantityChange({ id, quantity }));
  };
  const totalPrice = shoppingCartList.reduce((acc, { price, quantity }) => {
    return acc + Number.parseInt(price) * quantity;
  }, 0);

  return (
    <>
      {shoppingCartList?.length !== 0 && (
        <ul>
          {shoppingCartList.map(({ name, price, id, shopId, quantity }) => {
            return (
              <li key={id + shopId}>
                <p>{name}</p>
                <p>{price}</p>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={quantity}
                  onChange={e => onQuantityChange(id, +e.target.value)}
                />
                <button onClick={() => onBtnRemoveClick(id, shopId)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
      <p>Total Price: {totalPrice} UAH</p>
    </>
  );
};

export default ShoppingCartList;
