// index.js
const express = require("express");
const bodyParser = require("body-parser");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mount analytics routes
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});
