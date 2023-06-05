import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateSelectedShopId } from '../../redux/selectedShopData/selectedShopDataSlice';
import { selectShopList } from '../../redux/shopList/shopListSelectors';
import { updateShopList } from '../../redux/shopList/shopListSlice';
import { selectShopInCart } from '../../redux/shoppingCart/shoppingCartSelectors';
import { getShopList } from '../../utils/shopsApi';
import ShopCard from '../ShopCard/ShopCard';
import css from './ShopList.module.css';

type Props = {
  // setselectedShopId: (id: string) => void;
};

const ShopList = (props: Props) => {
  const dispatch = useTypedDispatch();
  const shopList = useSelector(selectShopList);
  const shopInCartId = useSelector(selectShopInCart);

  useEffect(() => {
    if (!shopList) {
      getShopList().then(shops => {
        dispatch(updateShopList(shops));
      });
    }
  }, [dispatch, shopList]);

  const changeSelectedShop = (shopId: string) => {
    if (!shopInCartId) {
      dispatch(updateSelectedShopId(shopId));
    }
  };
  return (
    <div className={css.container}>
      <p>Shops:</p>
      <ul className={css.list}>
        {shopList?.map(({ id, shopName, logo }) => {
          if (shopInCartId) {
            return (
              <li className={css.item} key={id}>
                <ShopCard id={id} shopName={shopName} logo={logo} disabled={shopInCartId !== id} />
              </li>
            );
          } else {
            return (
              <li className={css.item} key={id}>
                <ShopCard
                  id={id}
                  shopName={shopName}
                  logo={logo}
                  setselectedShopId={() => changeSelectedShop(id)}
                  disabled={false}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ShopList;
