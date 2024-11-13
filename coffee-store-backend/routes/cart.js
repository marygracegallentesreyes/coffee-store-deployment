const express = require('express');
const router = express.Router();
const Cart = require('../models/CartItem');
const Product = require('../models/Product');

// Add product to cart
router.post('/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne(); // Retrieve the cart (we're assuming a single global cart)

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Update quantity if product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId'); // Populate product details

    if (!cart || cart.items.length === 0) {
      return res.json({ items: [] }); // Return an empty array if the cart is empty
    }

    // Format the response with product details
    const fullCartItems = cart.items.map(item => ({
      id: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image,
      quantity: item.quantity
    }));

    res.json({ items: fullCartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart data' });
  }
});

// Remove product from cart
router.delete('/cart/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing product from cart' });
  }
});


module.exports = router;
