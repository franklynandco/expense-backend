const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'spendwise_user',
  password: 'your_mysql_password',
  database: 'spendwise_users',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
  connection.end();
});
