import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
  selectClientAddress,
  selectClientEmail,
  selectClientName,
  selectClientPhone,
  selectSelectedAddress,
} from '../../redux/clientData/clientDataSelectors';
import {
  updateClientAddress,
  updateClientEmail,
  updateClientName,
  updateClientPhone,
  updateSelectedAddress,
} from '../../redux/clientData/clientDataSlice';
import css from './ClientDataForm.module.css';

type Props = {};

const ClientDataForm = (props: Props) => {
  const name = useSelector(selectClientName);
  const email = useSelector(selectClientEmail);
  const phone = useSelector(selectClientPhone);
  const address = useSelector(selectClientAddress);
  const selectedAddress = useSelector(selectSelectedAddress);
  const dispatch = useTypedDispatch();

  return (
    <form className={css.container}>
      <label>
        Name
        <input
          onChange={e => dispatch(updateClientName(e.target.value))}
          type="text"
          name="name"
          value={name}
        />
      </label>
      <label>
        Email
        <input
          onChange={e => dispatch(updateClientEmail(e.target.value))}
          type="text"
          name="email"
          value={email}
        />
      </label>
      <label>
        Phone
        <input
          onChange={e => dispatch(updateClientPhone(e.target.value))}
          type="text"
          name="phone"
          value={phone}
        />
      </label>
      <label>
        Type your Address manualy
        <input
          onChange={e => {
            dispatch(updateClientAddress(e.target.value));
            dispatch(updateSelectedAddress(e.target.value));
          }}
          type="text"
          name="address"
          value={address}
        />
      </label>
      <div>
        <p>Chosen address</p>
        <p>{selectedAddress}</p>
      </div>
    </form>
  );
};

export default ClientDataForm;
