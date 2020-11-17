const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const auth = require("../middleware/auth");
let invoices = require("../invoiceData");
const Invoice = require("../models/invoice");

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

// get invoice by id (by owner)
router.get("/invoices/:id/", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const invoice = await Invoice.findOne({ _id, owner: req.user._id });
    if (!invoice) {
      return res.status(404).send(invoice);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// get all invoices
router.get("/invoices", auth, async (req, res) => {
  try {
    await req.user.populate("invoices").execPopulate();
    res.send(req.user.invoices);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update invoice by id + owner

router.patch('tasks/:id',auth, async (req,res)=>{

})
// GET /invoice?store=zara
//?limit=10&skip=20
// sortBy=createdAt:desc
// -1 desc 1 asce
// router.get("/invoices", auth, async (req, res) => {
//   const match = {};
//   const sort = {};

//   if (req.query.completed) {
//     // need to convert to boolean
//     match.completed = req.query.completed === "true";
//   }
//   if (req.query.sortBy) {
//     const parts = req.query.sortBy;
//   }
//   try {
//     await req.users
//       .populate({
//         path: "invoice",
//         match,
//         options: {
//           limit: parseInt(req.query.limit),
//           skip: parseInt(req.query.skip),
//           sort: {
//             createdAt: -1,
//           },
//         },
//       })
//       .execPopulate();
//   } catch (e) {
//     res.status(500).send();
//   }
// });


// delete invoice id
router.delete("/invoices/:id", auth,(req, res) => {
	tru{
		const invoice = await Invoice
	}
	const found = invoices.find((item) => item.id === req.params.id);
  if (!found) {
    return res.sendStatus(400);
  }

  res.json(invoices);
});


module.exports = router;
