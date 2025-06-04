// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    setCartItems(cartItemsString ? JSON.parse(cartItemsString) : []);
  }, []);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);
  const handleRemoveItem = (itemId) => {
    // Only remove the first matching item by ID
    const indexToRemove = cartItems.findIndex((item) => item.id === itemId);
    if (indexToRemove !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(indexToRemove, 1); // Remove one item at the found index
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };
  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const handlePay = async () => {
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }
    const [firstName, ...rest] = user.fullName.trim().split(" ");
    const lastName = rest.join(" ") || " ";
    const description = cartItems.map(item => item.model).join(", ");
    const paymentData = {
      amount: calculateTotalPrice(), // Call the function to get the total price
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      customization: { description }
    };
    try {
      const response = await fetch("http://localhost:9090/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const checkoutUrl = await response.text();

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        handleClearCart();
      } else {
        alert("No checkout URL received.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initialization failed.");
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
                <img
                  src={item.image}
                  alt={item.make}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>
                    {item.make} {item.model}
                  </h3>
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
            <h1>Total: ${calculateTotalPrice()}</h1>
            <button className="cart-pay-button" onClick={() => handlePay()}>
              Check out
            </button>
            <button className="cart-pay-button" onClick={() => handleClearCart()}>
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
