const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const transactionsRoute = require("./routes/transactions");

dotenv.config();

//connect with db
mongoose.connect(
  process.env.CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log("Connected to database! error ->", err)
);

//middleware
app.use(express.json());

//routes middleware
app.use("/api/user", authRoute);
app.use("/api/transactions", transactionsRoute);

//start listening
const port = process.env.PORT;
app.listen(port || 5000, () => console.log(`Server running on port ${port}.`));
