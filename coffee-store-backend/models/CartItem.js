const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema] // Array of Cart Items
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
