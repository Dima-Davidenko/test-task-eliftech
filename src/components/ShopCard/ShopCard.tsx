import React from 'react';

type Props = {
  id: string;
  shopName: string;
  logo: string;
};

const ShopCard = ({ id, shopName, logo }: Props) => {
  return (
    <div>
      <p>{shopName}</p>
      <img src={logo} alt={shopName} />
    </div>
  );
};

export default ShopCard;
