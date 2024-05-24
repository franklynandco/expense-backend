const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const dbConfig = require('./config/db.config');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`User Service running on port ${port}`);
});

dbConfig.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database');
  }
});
