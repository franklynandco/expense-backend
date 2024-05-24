const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const verifyToken = require('../middlewares/authMiddleware');

// Create an expense
router.post('/expenses', verifyToken, expenseController.createExpense);

// Get all expenses for the authenticated user
router.get('/expenses', verifyToken, expenseController.getExpenses);

// Update an expense
router.put('/expenses/:id', verifyToken, expenseController.updateExpense);

// Delete an expense
router.delete('/expenses/:id', verifyToken, expenseController.deleteExpense);

module.exports = router;

