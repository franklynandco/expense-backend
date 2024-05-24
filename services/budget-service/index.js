// index.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const budgetRoutes = require('./routes/budgetRoutes');
const Budget = require('./models/budgetModel');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/budgets', budgetRoutes);

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Budget Service running on port ${PORT}`);
});

// Initialize database
Budget.createTable();
