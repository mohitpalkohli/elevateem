const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

// Mount routes
router.use('/users', userRoutes);

// Base route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

module.exports = router; 