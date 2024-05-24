-- Create the database if it does not exist
CREATE DATABASE spendwise_users;

-- Grant permissions if needed
GRANT ALL PRIVILEGES ON spendwise_users.* TO 'spendwise_user'@'localhost';
FLUSH PRIVILEGES;
