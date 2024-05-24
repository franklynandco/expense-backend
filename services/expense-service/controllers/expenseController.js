const db = require('../config/db.config'); // Ensure this path is correct

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.userId; // Assuming the user ID is set in the middleware

    console.log('Creating expense for user:', userId);

    if (!amount || !description) {
      return res.status(400).send({ error: 'Amount and description are required' });
    }

    const result = await db.query('INSERT INTO expenses (user_id, amount, description) VALUES (?, ?, ?)', [userId, amount, description]);

    console.log('Expense created:', result);

    res.status(201).send({ message: 'Expense created successfully', expenseId: result.insertId });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).send({ error: 'An error occurred while creating the expense' });
  }
};

// Get all expenses for the authenticated user
const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('Fetching expenses for user:', userId);

    const [rows] = await db.query('SELECT * FROM expenses WHERE user_id = ?', [userId]);

    res.status(200).send(rows);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send({ error: 'An error occurred while fetching the expenses' });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    const userId = req.userId;

    console.log('Updating expense for user:', userId, 'Expense ID:', id);

    const [result] = await db.query('UPDATE expenses SET amount = ?, description = ? WHERE id = ? AND user_id = ?', [amount, description, id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Expense not found or not authorized' });
    }

    res.status(200).send({ message: 'Expense updated successfully' });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).send({ error: 'An error occurred while updating the expense' });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    console.log('Deleting expense for user:', userId, 'Expense ID:', id);

    const [result] = await db.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Expense not found or not authorized' });
    }

    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).send({ error: 'An error occurred while deleting the expense' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};


