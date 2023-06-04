import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
  selectClientAddress,
  selectClientEmail,
  selectClientName,
  selectClientPhone,
} from '../../redux/clientData/clientDataSelectors';
import {
  updateClientAddress,
  updateClientEmail,
  updateClientName,
  updateClientPhone,
} from '../../redux/clientData/clientDataSlice';

type Props = {};

const ClientDataForm = (props: Props) => {
  const name = useSelector(selectClientName);
  const email = useSelector(selectClientEmail);
  const phone = useSelector(selectClientPhone);
  const address = useSelector(selectClientAddress);
  const dispatch = useTypedDispatch();

  return (
    <form>
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
        Address
        <input
          onChange={e => dispatch(updateClientAddress(e.target.value))}
          type="text"
          name="address"
          value={address}
        />
      </label>
    </form>
  );
};

export default ClientDataForm;
