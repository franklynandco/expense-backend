const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const connection = require('../config/db.config');

// Create a User table if it doesn't exist
const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');
    }
  });
};

// Call the function to create the table
createUserTable();

module.exports = {
  createUser: (user, callback) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    connection.query(query, [user.username, user.email, hashedPassword], callback);
  },
  findUserByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], callback);
  }
};
