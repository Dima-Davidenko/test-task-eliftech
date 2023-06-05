import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NavMenu.module.css';
import { useSelector } from 'react-redux';
import { selectShoppingCartList } from '../../redux/shoppingCart/shoppingCartSelectors';

type Props = {};

const NavMenu = (props: Props) => {
  const shoppingCart = useSelector(selectShoppingCartList);
  return (
    <nav className={css.container}>
      <NavLink
        className={css.navLink}
        style={({ isActive }) => ({
          color: isActive ? 'blue' : '#545e6f',
        })}
        to="/"
        end
      >
        Shop
      </NavLink>
      <NavLink
        className={css.navLink}
        style={({ isActive }) => ({
          color: isActive ? 'blue' : '#545e6f',
        })}
        to="/shopping-cart"
      >
        Shopping Cart{' '}
        {shoppingCart.length
          ? `(${shoppingCart.length} item${shoppingCart.length > 1 ? 's' : ''})`
          : '(empty)'}
      </NavLink>
    </nav>
  );
};

export default NavMenu;
