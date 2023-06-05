import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import {
  updateClientAddress,
  updateSelectedAddress,
  updateSelectedMarkerPosition,
} from '../../../redux/clientData/clientDataSlice';
import css from './ClientAddresses.module.css';
import {
  selectClientAddress,
  selectSelectedAddress,
} from '../../../redux/clientData/clientDataSelectors';

type Props = {
  clientAddressesArray: google.maps.GeocoderResult[] | null;
  setClientAddressesArray: (addressesArray: google.maps.GeocoderResult[] | null) => void;
};

const ClientAddresses = ({ clientAddressesArray, setClientAddressesArray }: Props) => {
  const dispatch = useTypedDispatch();
  const address = useSelector(selectClientAddress);
  const selectedAddress = useSelector(selectSelectedAddress);
  const handleAddressClick = ({ address, location }: { address: string; location: any }) => {
    dispatch(updateSelectedAddress(address));
    dispatch(updateClientAddress(address));
    setClientAddressesArray(null);
    dispatch(updateSelectedMarkerPosition(location));
  };
  return (
    <div className={css.container}>
      <label>
        Type your Address manualy:
        <input
          className={css.input}
          onChange={e => {
            dispatch(updateClientAddress(e.target.value));
            dispatch(updateSelectedAddress(e.target.value));
          }}
          type="text"
          name="address"
          value={address}
        />
      </label>
      <p className={css.title}>
        Or drag marker on the map and choose your address from the list bellow
      </p>
      {clientAddressesArray && (
        <ul className={css.list}>
          {clientAddressesArray.map(({ geometry, formatted_address, place_id }) => {
            return (
              <li
                className={css.item}
                key={place_id}
                onClick={() =>
                  handleAddressClick({ address: formatted_address, location: geometry.location })
                }
              >
                {formatted_address}
              </li>
            );
          })}
        </ul>
      )}

      <div className={css.wrapper}>
        <p className={css.title}>Chosen address:</p>
        <p className={css.address}>{selectedAddress}</p>
      </div>
    </div>
  );
};

export default ClientAddresses;
