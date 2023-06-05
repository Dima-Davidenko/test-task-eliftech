import { Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import Shop from './pages/Shop/Shop';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';

const App = () => {
  return (
    <div>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
};

export default App;
