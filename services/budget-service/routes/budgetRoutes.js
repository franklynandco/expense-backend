// budgetRoutes.js

const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const verifyToken = require('../middlewares/authMiddleware');

// Route to create a new budget
router.post('/', verifyToken, budgetController.createBudget);

// Route to get all budgets for a specific user
router.get('/', verifyToken, budgetController.getAllBudgets);

// Route to get a specific budget by its ID
router.get('/:id', verifyToken, budgetController.getBudgetById);

// Route to update an existing budget
router.put('/:id', verifyToken, budgetController.updateBudget);

// Route to delete a budget
router.delete('/:id', verifyToken, budgetController.deleteBudget);

module.exports = router;


