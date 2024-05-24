const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/profile', authMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ message: `User ID: ${req.userId}` });
});

module.exports = router;
