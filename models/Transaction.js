const mongoose = require("mongoose");
const expenseCategories = [
  "Food",
  "Commute",
  "Household",
  "Apparel",
  "Health",
  "Beauty",
  "Education",
  "Gift",
  "Other",
];
const incomeCategories = [
  "Salary",
  "Allowance",
  "Business",
  "Interest",
  "Gift",
  "Other",
];

const transactionSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: [true, "Detail Missing!"],
  },
  amount: {
    type: Number,
    required: [true, "Amount Missing!"],
  },
  type: {
    type: String,
    required: [true, "Transaction type missing!"],
    enum: ["expense", "income"],
  },
  date: {
    type: Date,
    required: [true, "Date missing!"],
  },
  category: {
    type: String,
    required: [true, "Category missing!"],
    validate: {
      validator: function (value) {
        return (
          (this.type === "income" && incomeCategories.includes(value)) ||
          (this.type === "expense" && expenseCategories.includes(value))
        );
      },
      message: "Invalid category",
    },
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
