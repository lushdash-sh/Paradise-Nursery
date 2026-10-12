import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * parseInt(item.cost.replace('$', '')), 
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => window.location.reload()}>Home</span>
          <span onClick={onContinueShopping}>Plants</span>
          <span>Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: ${(item.quantity * parseInt(item.cost.replace('$', ''))).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            ))}
            
            <div className="cart-summary">
              <h3>Total Cart Amount: ${totalAmount.toFixed(2)}</h3>
            </div>
            
            <div className="cart-actions">
              <button className="get-started-btn" onClick={onContinueShopping}>
                Continue Shopping
              </button>
              <button className="get-started-btn" onClick={() => alert('Checkout Coming Soon!')}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
