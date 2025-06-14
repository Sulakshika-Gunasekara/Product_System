// routes/productRoutes.js
const express = require('express');
const { 
  createProduct, 
  getProducts, 
  deleteProduct, 
  updateProduct, 
  getProductById 
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createProduct);        // Protected route
router.get('/', getProducts);                    // Public route
router.delete('/:id', protect, deleteProduct);  // Protected route
router.put('/:id', protect, updateProduct);     // Protected route
router.get('/:id', protect, getProductById);    // Protected route

module.exports = router;