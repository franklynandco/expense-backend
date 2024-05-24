const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api', expenseRoutes);

app.listen(port, () => {
  console.log(`Expense Service running on port ${port}`);
});


