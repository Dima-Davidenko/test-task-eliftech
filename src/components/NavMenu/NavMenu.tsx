import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NavMenu.module.css';

type Props = {};

const NavMenu = (props: Props) => {
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
        Shopping Cart
      </NavLink>
    </nav>
  );
};

export default NavMenu;
