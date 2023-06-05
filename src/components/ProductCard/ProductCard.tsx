import css from './ProductCard.module.css';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addItem } from '../../redux/shoppingCart/shoppingCartSlice';
import { useSelector } from 'react-redux';
import { selectShoppingCartList } from '../../redux/shoppingCart/shoppingCartSelectors';

type Props = {
  id: string;
  selectedShopId: string;
  name: string;
  price: string;
};

const ProductCard = ({ name, price, id, selectedShopId }: Props) => {
  const dispatch = useTypedDispatch();
  const shoppingCart = useSelector(selectShoppingCartList);
  const disabled = shoppingCart.some(product => {
    return product.id === id;
  });

  const onBtnBuyClick = (name: string, id: string, price: string) => {
    dispatch(addItem({ shopId: selectedShopId, id, name, price, quantity: 1 }));
  };
  return (
    <div className={css.container}>
      <img className={css.productImg} src="https://placehold.co/200x100" alt={name} />
      <p className={css.productName}>{name}</p>
      <p className={css.productPrice}>{price}</p>
      <button
        className={css.orderBtn}
        onClick={() => onBtnBuyClick(name, id, price)}
        disabled={disabled}
      >
        {disabled ? 'Already in cart' : 'Add to cart'}
      </button>
    </div>
  );
};

export default ProductCard;
