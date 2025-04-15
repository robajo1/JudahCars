// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem('cartItems');
    setCartItems(cartItemsString ? JSON.parse(cartItemsString) : []);
  }, []);

  const handleRemoveItem = (itemId) => {
    // Only remove the first matching item by ID
    const indexToRemove = cartItems.findIndex(item => item.id === itemId);
    if (indexToRemove !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(indexToRemove, 1); // Remove one item at the found index
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.make} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.make} {item.model}</h3>
                  <p>Price: ${item.price}</p>
                </div>
                <button
                  className="cart-item-remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total: ${calculateTotalPrice()}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
