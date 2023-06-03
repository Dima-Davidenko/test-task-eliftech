import React from 'react';
import css from './ShopCard.module.css';

type Props = {
  id: string;
  shopName: string;
  logo: string;
  setselectedShopId: (id: string) => void;
  disabled: boolean;
};

const ShopCard = ({ id, shopName, logo, setselectedShopId, disabled }: Props) => {
  return (
    <div className={css.container} onClick={() => setselectedShopId(id)}>
      <img src={logo} alt={shopName} className={css.img} />
      <p>{shopName}</p>
      {disabled && <p>----disabled</p>}
    </div>
  );
};

export default ShopCard;
