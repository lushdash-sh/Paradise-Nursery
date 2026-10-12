import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './App.css';

const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", cost: "$15", image: "https://via.placeholder.com/200" },
      { name: "Spider Plant", cost: "$12", image: "https://via.placeholder.com/200" },
      { name: "Peace Lily", cost: "$18", image: "https://via.placeholder.com/200" },
      { name: "Boston Fern", cost: "$14", image: "https://via.placeholder.com/200" },
      { name: "Rubber Plant", cost: "$20", image: "https://via.placeholder.com/200" },
      { name: "Aloe Vera", cost: "$10", image: "https://via.placeholder.com/200" }
    ]
  },
  {
    category: "Aromatic",
    plants: [
      { name: "Lavender", cost: "$16", image: "https://via.placeholder.com/200" },
      { name: "Mint", cost: "$8", image: "https://via.placeholder.com/200" },
      { name: "Rosemary", cost: "$10", image: "https://via.placeholder.com/200" },
      { name: "Basil", cost: "$7", image: "https://via.placeholder.com/200" },
      { name: "Jasmine", cost: "$22", image: "https://via.placeholder.com/200" },
      { name: "Oregano", cost: "$9", image: "https://via.placeholder.com/200" }
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Jade Plant", cost: "$14", image: "https://via.placeholder.com/200" },
      { name: "Echeveria", cost: "$11", image: "https://via.placeholder.com/200" },
      { name: "Zebra Plant", cost: "$13", image: "https://via.placeholder.com/200" },
      { name: "Burro's Tail", cost: "$15", image: "https://via.placeholder.com/200" },
      { name: "String of Pearls", cost: "$18", image: "https://via.placeholder.com/200" },
      { name: "Haworthia", cost: "$12", image: "https://via.placeholder.com/200" }
    ]
  }
];

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => window.location.reload()}>Home</span>
          <span>Plants</span>
          <span onClick={onCartClick}>Cart ({totalCartItems})</span>
        </div>
      </nav>

      <div className="products-container">
        {plantsArray.map((categoryGroup, index) => (
          <div key={index}>
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{categoryGroup.category}</h2>
            <div className="product-grid">
              {categoryGroup.plants.map((plant, idx) => (
                <div className="product-card" key={idx}>
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <h3>{plant.name}</h3>
                  <p>{plant.cost}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={cartItems.some(item => item.name === plant.name)}
                  >
                    {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
