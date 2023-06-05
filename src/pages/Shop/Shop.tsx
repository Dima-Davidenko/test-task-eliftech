import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList/ProductList';
import ShopList from '../../components/ShopList/ShopList';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateSelectedShopData } from '../../redux/selectedShopData/selectedShopDataSlice';
import { selectShopInCart } from '../../redux/shoppingCart/shoppingCartSelectors';
import { getShopInfoById } from '../../utils/shopsApi';
import { selectSelectedShopId } from '../../redux/selectedShopData/selectedShopDataSelectors';

type Props = {};

const Shop = (props: Props) => {
  const shopInCartId = useSelector(selectShopInCart);
  const [selectedShopId, setselectedShopId] = useState<string>(shopInCartId);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (selectedShopId) {
      getShopInfoById(selectedShopId).then(shopInfo => {
        dispatch(updateSelectedShopData(shopInfo));
      });
    }
  }, [dispatch, selectedShopId]);

  const changeSelectedShop = (shopId: string) => {
    if (!shopInCartId) {
      setselectedShopId(shopId);
    }
  };
  return (
    <div>
      <ShopList setselectedShopId={changeSelectedShop} />
      <ProductList selectedShopId={selectedShopId} />
    </div>
  );
};

export default Shop;
