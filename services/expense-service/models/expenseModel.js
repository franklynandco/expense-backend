const connection = require('../config/db.config');

// Create an Expense table if it doesn't exist
const createExpenseTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS expenses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL
    )
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating expenses table:', err);
    } else {
      console.log('Expenses table created or already exists');
    }
  });
};

// Call the function to create the table
createExpenseTable();

module.exports = {
  createExpense: (expense, callback) => {
    const query = 'INSERT INTO expenses (userId, amount, category, description, date) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [expense.userId, expense.amount, expense.category, expense.description, expense.date], callback);
  },
  getExpensesByUserId: (userId, callback) => {
    const query = 'SELECT * FROM expenses WHERE userId = ?';
    connection.query(query, [userId], callback);
  },
  // Additional CRUD operations can be added here
};
