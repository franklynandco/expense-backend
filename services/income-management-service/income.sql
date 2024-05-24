CREATE USER 'spendwise_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON spendwise_incomes.* TO 'spendwise_user'@'localhost';
FLUSH PRIVILEGES;
