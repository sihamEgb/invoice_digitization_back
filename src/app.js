const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const invoiceRouter = require("./routers/invoice");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(invoiceRouter);

module.exports = app;
