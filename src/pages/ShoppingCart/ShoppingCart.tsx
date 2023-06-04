import React from 'react';
import ClientDataForm from '../../components/ClientDataForm/ClientDataForm';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import { useSelector } from 'react-redux';
import {
  selectClientAddress,
  selectClientEmail,
  selectClientName,
  selectClientPhone,
} from '../../redux/clientData/clientDataSelectors';
import {
  selectShopInCart,
  selectShoppingCartList,
} from '../../redux/shoppingCart/shoppingCartSelectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { resetClientData } from '../../redux/clientData/clientDataSlice';
import { resetShoppingCart } from '../../redux/shoppingCart/shoppingCartSlice';

type Props = {};

const ShoppingCart = (props: Props) => {
  const dispatch = useTypedDispatch();
  const name = useSelector(selectClientName);
  const email = useSelector(selectClientEmail);
  const phone = useSelector(selectClientPhone);
  const address = useSelector(selectClientAddress);
  const products = useSelector(selectShoppingCartList);
  const shopId = useSelector(selectShopInCart);
  const saveOrder = () => {
    localStorage.setItem(
      'clientContacts',
      JSON.stringify({
        clientContacts: { name, email, phone, address },
        products,
        shopId,
      })
    );
    dispatch(resetClientData());
    dispatch(resetShoppingCart());
  };

  return (
    <div>
      <ClientDataForm />
      <ShoppingCartList />
      <button onClick={saveOrder}>Order</button>
    </div>
  );
};

export default ShoppingCart;
