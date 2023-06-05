import { useSelector } from 'react-redux';
import {
  selectSelectedShopName,
  selectSelectedShopProductList,
} from '../../redux/selectedShopData/selectedShopDataSelectors';
import ProductCard from '../ProductCard/ProductCard';
import css from './ProductList.module.css';

type Props = {
  selectedShopId: string;
};

const ProductList = ({ selectedShopId }: Props) => {
  const productList = useSelector(selectSelectedShopProductList);
  const shopName = useSelector(selectSelectedShopName);

  return (
    <div className={css.container}>
      {!selectedShopId && <p>Please choose a shop</p>}
      {selectedShopId && <p>{shopName}</p>}
      <ul className={css.list}>
        {productList.map(({ name, price, id }) => {
          return (
            <li className={css.item} key={name}>
              <ProductCard id={id} name={name} price={price} selectedShopId={selectedShopId} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
