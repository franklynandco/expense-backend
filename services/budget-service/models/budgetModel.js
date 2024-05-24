// budgetModel.js

const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection(dbConfig);

const Budget = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS budgets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        amount DECIMAL(10, 2),
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      console.log('Budgets table created or already exists');
    });
  },

  create: (budget, result) => {
    connection.query('INSERT INTO budgets SET ?', budget, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...budget });
    });
  },

  findByUserId: (userId, result) => {
    connection.query(`SELECT * FROM budgets WHERE user_id = ?`, [userId], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  },

  findById: (id, result) => {
    connection.query(`SELECT * FROM budgets WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: 'not_found' }, null);
    });
  },

  updateById: (id, budget, result) => {
    connection.query('UPDATE budgets SET amount = ?, description = ? WHERE id = ?', [budget.amount, budget.description, id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, { id: id, ...budget });
    });
  },

  remove: (id, result) => {
    connection.query('DELETE FROM budgets WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, res);
    });
  }
};

module.exports = Budget;
