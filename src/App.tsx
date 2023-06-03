import React from 'react';
import Shop from './pages/Shop/Shop';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import { NavLink, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav>
        <NavLink to="/" end>
          Shop
        </NavLink>
        <NavLink to="/shopping-cart">Shopping Cart</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
};

export default App;
