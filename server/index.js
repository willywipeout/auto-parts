const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");

// const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

// Mount routes
// app.use("/products", productRoutes);
// app.use("/users", userRoutes);
// app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
