import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setCartItems(cartItems.filter(item => item._id !== id));
    })
    .catch(error => console.error('Error removing from cart:', error));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            // Check if item.product exists before accessing properties
            <li key={item._id}>
              {item.product && item.product.name ? (
                <>
                  {item.product.name} - {item.quantity} x ${item.product.price}
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </>
              ) : (
                <p>Product details are missing</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;