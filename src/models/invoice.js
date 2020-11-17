const mongoose = require("mongoose");
const validator = require("validator");

const Invoice = mongoose.model("Invoice", {
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  id: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

module.exports = Invoice;
