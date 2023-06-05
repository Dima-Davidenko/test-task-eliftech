import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import {
  selectClientEmail,
  selectClientName,
  selectClientPhone,
} from '../../redux/clientData/clientDataSelectors';
import {
  updateClientEmail,
  updateClientName,
  updateClientPhone,
} from '../../redux/clientData/clientDataSlice';
import css from './ClientDataForm.module.css';

type Props = {};

const ClientDataForm = (props: Props) => {
  const name = useSelector(selectClientName);
  const email = useSelector(selectClientEmail);
  const phone = useSelector(selectClientPhone);

  const dispatch = useTypedDispatch();

  return (
    <form className={css.container}>
      <p className={css.title}>To make order - input your data:</p>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          onChange={e => dispatch(updateClientName(e.target.value))}
          type="text"
          name="name"
          value={name}
        />
      </label>
      <label className={css.label}>
        Email
        <input
          className={css.input}
          onChange={e => dispatch(updateClientEmail(e.target.value))}
          type="text"
          name="email"
          value={email}
        />
      </label>
      <label className={css.label}>
        Phone
        <input
          className={css.input}
          onChange={e => dispatch(updateClientPhone(e.target.value))}
          type="text"
          name="phone"
          value={phone}
        />
      </label>
    </form>
  );
};

export default ClientDataForm;
