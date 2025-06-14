// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
