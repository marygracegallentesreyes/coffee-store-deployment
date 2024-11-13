import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart data from backend
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart');
        const data = await response.json();
        setCartItems(data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await fetch(`http://localhost:5000/cart/${productId}`, { method: 'DELETE' });
      setCartItems(cartItems.filter(item => item.id !== productId)); // Update UI after removal
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: '50px' }} />
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
