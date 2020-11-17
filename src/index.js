const express = require("express");
const path = require("path");
const app = express();

require("./db/mongoose");
const User = require("./models/user");
const Invoice = require("./models/invoice");

// const userSchema = new mongoose();
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   if (req.method === "GET") {
//     res.send("GET REQUESTS are diabled");
//   } else {
//     next();
//   }
// });
const bcrypt = require("bcryptjs");
// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   // we cannot get the original password back
//   // one way algorithim - we can only compare
//   // not reversible
//   console.log(password);
//   console.log(hashedPassword);
//   const isMatch = await bcrypt.compare("red12345!", hashedPassword);
// };

const multer = require("multer");
const upload = multer({
  dest: "images",
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});
app.use(express.urlencoded({ extended: false }));

// register router
const userRouter = require("./routers/user");
const invoiceRouter = require("./routers/invoice");

app.use(express.json());
app.use(userRouter);
app.use(invoiceRouter);
app.use(express.json());
// app.use("/invoice", require("./routers/invoice"));
// app.use("/user", require("./routers/user"));
// const userRouter = require('./routers/user');
// app.use(userRouter);

// serve all the files from public folder
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// create a server
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Server is up on http://" + host + ":" + port);
});

const invoice = require("./models/invoice");

// const main = async () =>{

//   // get owner of invoice
//   const invoice = await Task.findById('fefsges')
//   await Invoice.populate('owner').execPopulate()
//   console.log(invoice.owner)

//   // get invoices of uesr
//   const user = await User.findById('')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks);
// }
const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);
//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };
// myFunction();
