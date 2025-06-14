// controllers/productController.js
const Product = require('../models/Product');

// Create Product
const createProduct = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const product = new Product({
      title,
      description,
      price,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProduct, getProducts };
