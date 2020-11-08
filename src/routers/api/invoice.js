const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let invoices = require("../../invoiceData");

// GET /invoice?store=zara
//?limit=10&skip=20
// sortBy=createdAt:desc
// -1 desc 1 asce
router.get("/invoices",auth,async(req,res) =>{
	const match = {}
	const sort = {}

	if(req.query.completed){
		// need to convert to boolean
		match.completed = req.query.completed === 'true'
	}
	if(req.query.sortBy){
		const parts = req.query.sortBy
	}
	try{
		await req.users.populate({
			path:'invoice',
			match,
			options:{
				limit:parseInt(req.query.limit),
				skip:parseInt(req.query.skip),
				sort:{
					createdAt:-1
				}
			}
		}).execPopulate()
	}catch(e){
		res.status(500).send();
	}
});
// get all invoices (by userId)
router.get("/",(req,res) => {
	res.json(invoices);
})

// create new invoice (for userId)
router.put('/',(req,res) => {
	const newInvoice = {
		id:uuid.v1(),
		invoiceNumber:req.body.invoiceNumber,
		store:req.body.store,
		category:req.body.category,
		description:req.body.description,
		amount:req.body.amount,
		date:req.body.date,
		image:req.body.image,
	
	}
	if(!newInvoice.invoiceNumber ||
		!newInvoice.store ||
		!newInvoice.category ||
		!newInvoice.description ||
		!newInvoice.amount ||
		!newInvoice.date ||
		!newInvoice.image
		){
		return res.sendStatus(400);
	}
	invoices.push(newInvoice);
	res.json(newInvoice);
});	

// update invoice id (by userId)
// delete invoice id
router.delete('/:id',(req,res) => {
	const found = invoices.find(item => item.id === req.params.id);
	if(!found)
	{
		return res.sendStatus(400);
	}

	// delete invoice invoices.push(found);
	res.json(invoices);
});	

// get all invoices from store X
// get all invoices from date T
// get all invoices status = debit


// router.get("/:userId",(req,res) => {

// 	const found = answers.filter(item => item.userId === req.params.userId);
// 	console.log(found);
// 	res.json(found);
// })

// // get answers for id (specific user) + rank
// router.get("/:userId/:friendId",(req,res) => {
// 	const found = answers.find(item => item.id === req.params.friendId && item.userId === req.params.userId);
// 	if(!found)
// 	{
// 		return res.sendStatus(400);
// 	}
// 	let rank  = 0;
// 	const user = users.find(user => user.id === req.params.userId);
// 	if(user.answer1 === found.answer1) rank++;
// 	if(user.answer2 === found.answer2) rank++;
// 	if(user.answer3 === found.answer3) rank++;
// 	if(user.answer4 === found.answer4) rank++;
// 	found.rank = rank;
// 	console.log(found);
// 	res.json(found);
// })

// create new answer for userId (new person answers the quiz for friend)
// router.post('/:userId/:friendId',(req,res) => {
	
// 	const newAnswer = {
// 		id:req.params.friendId,
// 		userId:req.params.userId,
// 		answer1:req.body.answer1,
// 		answer2:req.body.answer2,
// 		answer3:req.body.answer3,
// 		answer4:req.body.answer4,
// 	}
// 	console.log(newAnswer);

// 	if(!newAnswer.id || !newAnswer.answer1 || 
// 		!newAnswer.answer2 || !newAnswer.answer3 || 
// 		!newAnswer.answer3  || !newAnswer.userId){
// 		return res.sendStatus(400);
// 	}
// 	answers.push(newAnswer);
// 	res.json(answers);
// });	
		
module.exports = router