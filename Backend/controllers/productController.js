// controllers/productController.js
const Product = require('../models/Product');

const productController = {
  // Create Product
  createProduct: async (req, res) => {
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
  },

  // Get All Products
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete Product
  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update Product
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { title, description, price },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get Product by ID
  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = productController;