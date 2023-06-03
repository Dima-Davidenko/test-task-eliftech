import React from 'react';
import ClientDataForm from '../../components/ClientDataForm/ClientDataForm';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';

type Props = {};

const ShoppingCart = (props: Props) => {
  return (
    <div>
      <ClientDataForm />
      <ShoppingCartList />
    </div>
  );
};

export default ShoppingCart;
