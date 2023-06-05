import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import {
  updateClientAddress,
  updateSelectedAddress,
} from '../../../redux/clientData/clientDataSlice';
import css from './ClientAddresses.module.css';

type Props = {
  clientAddressesArray: string[];
};

const ClientAddresses = ({ clientAddressesArray }: Props) => {
  const dispatch = useTypedDispatch();
  const handleAddressClick = (address: string) => {
    dispatch(updateSelectedAddress(address));
    dispatch(updateClientAddress(''));
  };
  return (
    <div className={css.container}>
      <p>Or drag marker on the map and choose your address from the list bellow</p>
      <ul className={css.list}>
        {clientAddressesArray.map((address, i) => {
          return (
            <li className={css.item} key={i} onClick={() => handleAddressClick(address)}>
              {address}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientAddresses;
