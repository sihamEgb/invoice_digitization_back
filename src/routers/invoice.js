const express = require("express");
const auth = require("../middleware/auth");
const Invoice = require("../models/invoice");
const router = express.Router();

// create new invoice
router.post("/invoices", auth, async (req, res) => {
  const invoice = new Invoice({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await invoice.save();
    res.status(201).send(invoice);
  } catch (e) {
    res.status(400).send(e);
  }
});
// get invoice by id
router.get("/invoices/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const invoice = await Invoice.findOne({ _id, owner: req.user._id });

    if (!invoice) {
      return res.status(404).send();
    }

    res.send(invoice);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update an invoice
router.patch("/invoices/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "description",
    "store",
    "category",
    "amount",
    "paymentMethod",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!invoice) {
      return res.status(404).send();
    }

    updates.forEach((update) => (invoice[update] = req.body[update]));
    await invoice.save();
    res.send(invoice);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete invoice
router.delete("/invoices/:id", auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!invoice) {
      res.status(404).send();
    }

    res.send(invoice);
  } catch (e) {
    res.status(500).send();
  }
});

// GET /invoices?category=name
// GET /invoices?limit=10&skip=20
// GET /invoices?sortBy=createdAt:desc
router.get("/invoices", auth, async (req, res) => {
  const match = {};
  const sort = {};

  // fix this
  // get all results from this category
  if (req.query.category) {
    match.category = req.query.category === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "invoices",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.invoices);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
