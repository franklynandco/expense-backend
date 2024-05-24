// index.js

// Import necessary modules
const express = require('express');
const app = express();
const incomeRoutes = require('./routes/incomeRoutes');

// Mount income routes
app.use('/api/incomes', incomeRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Income Service running on port ${PORT}`);
});

