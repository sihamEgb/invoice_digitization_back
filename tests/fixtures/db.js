const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Invoice = require("../../src/models/invoice");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "SihamA",
  email: "siham@temp.com",
  password: "1234567",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "SihamB",
  email: "siham@temp.com",
  password: "2345678",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const invoiceOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "kids clothes",
  store: "zara",
  category: "clothes",
  amount: 350,
  date: "30/05/2020",
  paymentMethod: visa,
  status: "debit",
  owner: userOne._id,
};

const invoiceTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "grocery",
  store: "Zad Market",
  category: "food",
  amount: 820,
  date: "30/06/2020",
  paymentMethod: visa,
  status: debit,
  owner: userOne._id,
};

const invoiceThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "my nee ipad",
  store: "istore",
  category: "electronics",
  amount: 1150,
  date: "05/04/2021",
  paymentMethod: visa,
  status: debit,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Invoice.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Invoice(invoiceOne).save();
  await new Invoice(invoiceTwo).save();
  await new Invoice(invoiceThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  invoiceOne,
  invoiceTwo,
  invoiceThree,
  setupDatabase,
};
