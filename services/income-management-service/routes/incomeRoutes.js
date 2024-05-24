// incomeRoutes.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const verifyToken = require('../middlewares/authMiddleware');

// Route to create a new income
router.post('/', verifyToken, incomeController.createIncome);

// Route to get all incomes for a specific user
router.get('/', verifyToken, incomeController.getAllIncomes);

// Route to get a specific income by its ID
router.get('/:id', verifyToken, incomeController.getIncomeById);

// Route to update an existing income
router.put('/:id', verifyToken, incomeController.updateIncome);

// Route to delete an income
router.delete('/:id', verifyToken, incomeController.deleteIncome);

module.exports = router;

