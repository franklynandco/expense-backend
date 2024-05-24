const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const port = 3002;

app.use(bodyParser.json());

app.use('/notifications', notificationRoutes);

app.listen(port, () => {
  console.log(`Notification Service running on port ${port}`);
});
