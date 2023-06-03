import { useEffect, useState } from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { product } from '../../types/types';
import { getProductListByShopId } from '../../utils/shopsApi';
import { addItem } from '../../redux/shoppingCart/shoppingCartSlice';

type Props = {
  selectedShopId: string;
};

const ProductList = ({ selectedShopId }: Props) => {
  const [productList, setProductList] = useState<product[] | []>([]);
  const [shopName, setShopName] = useState<string>('');
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (selectedShopId) {
      getProductListByShopId(selectedShopId).then(({ productList, shopName }) => {
        setProductList(productList);
        setShopName(shopName);
      });
    }
  }, [selectedShopId]);

  const onBtnBuyClick = (name: string, id: string, price: string) => {
    dispatch(addItem({ shopId: selectedShopId, id, name, price }));
  };

  return (
    <div>
      {!selectedShopId && <p>Please choose a shop</p>}
      {selectedShopId && <p>{shopName}</p>}
      <ul>
        {productList.map(({ name, price, id }) => {
          return (
            <li key={name}>
              <div>
                {name}: {price}
              </div>
              <button onClick={() => onBtnBuyClick(name, id, price)}>Buy</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
