import { useEffect, useState } from 'react';
import { product } from '../../types/types';
import { getProductListByShopId } from '../../utils/shopsApi';

type Props = {
  selectedShopId: string;
};

const ProductList = ({ selectedShopId }: Props) => {
  const [productList, setProductList] = useState<product[] | []>([]);
  const [shopName, setShopName] = useState<string>('');
  useEffect(() => {
    if (selectedShopId) {
      getProductListByShopId(selectedShopId).then(({ productList, shopName }) => {
        setProductList(productList);
        setShopName(shopName);
      });
    }
  }, [selectedShopId]);

  return (
    <div>
      {!selectedShopId && <p>Please choose a shop</p>}
      {selectedShopId && <p>{shopName}</p>}
      <ul>
        {productList.map(({ name, price }) => {
          return (
            <li key={name}>
              <div>
                {name}: {price}
              </div>
              <button>Buy</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
