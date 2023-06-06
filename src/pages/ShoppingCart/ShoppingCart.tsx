'use client';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import ClientDataForm from '../../components/ClientDataForm/ClientDataForm';
import Directions from '../../components/Directions/Directions';
import ClientAddresses from '../../components/GoogleMap/ClientAddresses/ClientAddresses';
import GoogleMapAdress from '../../components/GoogleMap/GoogleMapAdress';
import ShoppingCartList from '../../components/ShoppingCartList/ShoppingCartList';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
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
import { resetShoppingCart } from '../../redux/shoppingCart/shoppingCartSlice';
import css from './ShoppingCart.module.css';

type Props = {};

const ShoppingCart = (props: Props) => {
  const [clientAddressesArray, setClientAddressesArray] = useState<
    google.maps.GeocoderResult[] | null
  >(null);
  const [directions, setDirections] = useState<boolean>(false);
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
  const [isCaptchaDone, setIsCaptchaDone] = useState<boolean>(false);
  const submitBtnDisabled =
    !shoppingCartList.length || !name || !email || !phone || !address || !isCaptchaDone;

  const saveOrder = () => {
    localStorage.setItem(
      'order',
      JSON.stringify({
        clientContacts: { name, email, phone, address },
        products,
        shopId,
      })
    );
    // dispatch(resetClientData());
    dispatch(resetShoppingCart());
  };
  const captchaSiteKey = process.env.REACT_APP_GOOGLE_CAPTCHA_CLIENT_KEY_NEW as string;
  const completeCaptcha = () => {
    setIsCaptchaDone(true);
  };

  return (
    <div className={css.container}>
      <div className={css.leftColumn}>
        <GoogleMapAdress
          setClientAddressesArray={setClientAddressesArray}
          setDirectionProps={setDirectionProps}
          getDirections={directions}
        />
        <ClientDataForm />
        <ClientAddresses
          clientAddressesArray={clientAddressesArray}
          setClientAddressesArray={setClientAddressesArray}
        />
        <Directions
          directions={directions}
          setDirections={setDirections}
          directionProps={directionProps}
          setDirectionProps={setDirectionProps}
        />
      </div>
      <div className={css.rightColumn}>
        <ShoppingCartList />
        {submitBtnDisabled && (
          <p>To Submit the order enter your data in all inputs and add product to your cart</p>
        )}
        <ErrorBoundary
          onError={() => setIsCaptchaDone(true)}
          fallback={<div>CAPTCHA isn't available now</div>}
        >
          <ReCAPTCHA
            className={css.captcha}
            sitekey={captchaSiteKey}
            onChange={completeCaptcha}
            onErrored={() => setIsCaptchaDone(true)}
          />
        </ErrorBoundary>

        <button className={css.orderBtn} onClick={saveOrder} disabled={submitBtnDisabled}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
