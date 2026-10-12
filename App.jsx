import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Assume you configured the store here
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <Provider store={store}>
      <div className="app-container">
        {!showProducts ? (
          <div className="landing-page">
            <h1>Paradise Nursery</h1>
            <p>Your sanctuary for beautiful houseplants</p>
            <AboutUs />
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        ) : showCart ? (
          <CartItem onContinueShopping={() => setShowCart(false)} />
        ) : (
          <ProductList onCartClick={() => setShowCart(true)} />
        )}
      </div>
    </Provider>
  );
}

export default App;
