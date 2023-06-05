import React from 'react';
import css from './ShopCard.module.css';

type Props = {
  id: string;
  shopName: string;
  logo: string;
  setselectedShopId?: (id: string) => void;
  disabled: boolean;
};

const ShopCard = ({ id, shopName, logo, setselectedShopId, disabled }: Props) => {
  return (
    <div
      style={disabled ? { opacity: '0.4', cursor: 'auto' } : {}}
      className={css.container}
      onClick={setselectedShopId ? () => setselectedShopId(id) : () => {}}
    >
      <div className={css.wrapper}>
        <img src={logo} alt={shopName} className={css.img} />
        <p>{shopName}</p>
      </div>
      {disabled && <p className={css.warn}>You can only place an order in one store at a time</p>}
    </div>
  );
};

export default ShopCard;
