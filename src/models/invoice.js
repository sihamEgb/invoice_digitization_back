const mongoose = require("mongoose");
const validator = require("validator");

const invoiceSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    store: {
      type: String,
      required: true,
    },
    category: {
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
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
