const request = require("supertest");
const app = require("../src/app");
const Invoice = require("../src/models/invoice");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  invoiceOne,
  invoiceTwo,
  invoiceThree,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should add invoice for user", async () => {
  const response = await request(app)
    .post("/invoices")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "clothes for school",
      store: "zara",
      category: "clothes",
      amount: 300,
      date: "30/10/2020",
      paymentMethod: "visa",
      status: "debit",
    })
    .expect(201);
  const invoice = await Invoice.findById(response.body._id);
  expect(invoice).not.toBeNull();
});

test("Should fetch user invoices", async () => {
  const response = await request(app)
    .get("/invoices")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(1);
});

test("Should not delete other users invoices", async () => {
  const response = await request(app)
    .delete(`/invoices/${invoiceOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const invoice = await Invoice.findById(invoiceOne._id);
  expect(invoice).not.toBeNull();
});
