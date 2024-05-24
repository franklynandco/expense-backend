// incomeController.js

// Import necessary modules
const db = require('../config/db.config');

// Controller function to create a new income
exports.createIncome = (req, res) => {
    const { userId, sourceName, amount, frequency } = req.body;

    // Validate request body
    if (!userId || !sourceName || !amount || !frequency) {
        return res.status(400).json({ error: 'Please provide userId, sourceName, amount, and frequency' });
    }

    // Insert new income into the database
    const sql = 'INSERT INTO incomes (userId, sourceName, amount, frequency) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, sourceName, amount, frequency], (err, result) => {
        if (err) {
            console.error('Error creating income:', err);
            return res.status(500).json({ error: 'Failed to create income' });
        }
        res.status(201).json({ message: 'Income created successfully', incomeId: result.insertId });
    });
};

// Controller function to get all incomes for a specific user
exports.getAllIncomes = (req, res) => {
    const { userId } = req.query;

    // Fetch all incomes for the specified user from the database
    const sql = 'SELECT * FROM incomes WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching incomes:', err);
            return res.status(500).json({ error: 'Failed to fetch incomes' });
        }
        res.status(200).json(results);
    });
};

// Controller function to get a specific income by its ID
exports.getIncomeById = (req, res) => {
    const { id } = req.params;

    // Fetch the income with the specified ID from the database
    const sql = 'SELECT * FROM incomes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching income:', err);
            return res.status(500).json({ error: 'Failed to fetch income' });
        }
        if (!result.length) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.status(200).json(result[0]);
    });
};

// Controller function to update an existing income
exports.updateIncome = (req, res) => {
    const { id } = req.params;
    const { sourceName, amount, frequency } = req.body;

    // Validate request body
    if (!sourceName || !amount || !frequency) {
        return res.status(400).json({ error: 'Please provide sourceName, amount, and frequency' });
    }

    // Update the income with the specified ID in the database
    const sql = 'UPDATE incomes SET sourceName = ?, amount = ?, frequency = ? WHERE id = ?';
    db.query(sql, [sourceName, amount, frequency, id], (err, result) => {
        if (err) {
            console.error('Error updating income:', err);
            return res.status(500).json({ error: 'Failed to update income' });
        }
        res.status(200).json({ message: 'Income updated successfully' });
    });
};

// Controller function to delete an income
exports.deleteIncome = (req, res) => {
    const { id } = req.params;

    // Delete the income with the specified ID from the database
    const sql = 'DELETE FROM incomes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting income:', err);
            return res.status(500).json({ error: 'Failed to delete income' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    });
};
