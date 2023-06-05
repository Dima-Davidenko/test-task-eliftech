import { useSelector } from 'react-redux';
import ClientDataForm from '../../components/ClientDataForm/ClientDataForm';
import GoogleMapAdress from '../../components/GoogleMap/GoogleMapAdress';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
  selectClientAddress,
  selectClientEmail,
  selectClientName,
  selectClientPhone,
} from '../../redux/clientData/clientDataSelectors';
import { resetClientData } from '../../redux/clientData/clientDataSlice';
import {
  selectShopInCart,
  selectShoppingCartList,
} from '../../redux/shoppingCart/shoppingCartSelectors';
import { resetShoppingCart } from '../../redux/shoppingCart/shoppingCartSlice';
import ClientAddresses from '../../components/GoogleMap/ClientAddresses/ClientAddresses';
import { useState } from 'react';

type Props = {};

const ShoppingCart = (props: Props) => {
  const [clientAddressesArray, setClientAddressesArray] = useState<string[] | []>([]);
  const [getDirections, setGetDirections] = useState<boolean>(false);
  const [directionProps, setDirectionProps] = useState<{
    distance: string | undefined;
    duration: string | undefined;
  } | null>(null);
  const dispatch = useTypedDispatch();
  const shoppingCartList = useSelector(selectShoppingCartList);
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

  const resetDirections = () => {
    setGetDirections(false);
    setDirectionProps(null);
  };

  return (
    <div>
      <GoogleMapAdress
        setClientAddressesArray={setClientAddressesArray}
        setDirectionProps={setDirectionProps}
        getDirections={getDirections}
      />
      <ClientDataForm />
      <ShoppingCartList />
      <ClientAddresses clientAddressesArray={clientAddressesArray} />
      {shoppingCartList.length !== 0 && <button onClick={saveOrder}>Order</button>}
      {getDirections ? (
        <button onClick={resetDirections}>Reset directions</button>
      ) : (
        <button onClick={() => setGetDirections(true)}>Get directions</button>
      )}
      {directionProps && (
        <>
          <p>{directionProps.distance}</p>
          <p>{directionProps.duration}</p>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
