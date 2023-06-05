import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import ShopList from '../../components/ShopList/ShopList';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { selectSelectedShopId } from '../../redux/selectedShopData/selectedShopDataSelectors';
import { updateSelectedShopData } from '../../redux/selectedShopData/selectedShopDataSlice';
import { selectShopInCart } from '../../redux/shoppingCart/shoppingCartSelectors';
import { getShopInfoById } from '../../utils/shopsApi';
import css from './Shop.module.css';

type Props = {};

const Shop = (props: Props) => {
  const shopInCartId = useSelector(selectShopInCart);
  const selectedShopId = useSelector(selectSelectedShopId) || shopInCartId;

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (selectedShopId) {
      getShopInfoById(selectedShopId).then(shopInfo => {
        dispatch(updateSelectedShopData(shopInfo));
      });
    }
  }, [dispatch, selectedShopId, shopInCartId]);

  return (
    <div className={css.container}>
      <ShopList />
      <ProductList selectedShopId={selectedShopId} />
    </div>
  );
};

export default Shop;
