const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/invoice-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})

// const User = require('../models/user');
// const me = new User({
// 	name: 'Salam',
// 	age:28,
// });
// me.save().then(() =>{
// 	console.log(me);
// }).catch((error) => {
// 	console.log(error);
// )}

// // const mongoose = require('mongoose')
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// const connectionURL = "mongodb://127.0.0.1:27017"
// const databaseName = 'invoice-manager';

// const id = new ObjectID();
// console.log(id);
// MongoClient.connect(connectionURL,{
// 	useNewUrlParser: true
// },(error,client) => {
// 	if(error){
// 		return console.log('Unable to connect to database');
// 	}
// 	console.log('Connected correctly');
// 	const db = client.db(databaseName);
// 	// create
// 	db.collection('users').insertOne({
// 		_id:id,
// 		name:'Siham',
// 		age: 63,
// 	} , (error,result) => {
// 		if(error){
// 			return console.log('Unable to insert',error);
// 		}
// 		console.log(result.ops);
// 	});
// 	// update
// 	// delete
// 	// query documents find findOne
// 	db.collection('users').findOne({name:'Jen'},(error,user) => {
// 		if(error){
// 			return console.log('Unable to fetch')
// 		}
// 		console.log(user);
// 	});
// 	db.collection('users').find({age:63}).toArray((error,users) =>{
// 		console.log(users)
// 	})
// 	db.collection('users').fondOne({_id: new ObjectID("84u7594875n")},(error,user) => {
// 		if(error){
// 			return console.log("")
// 		}
// 		console.log("");
// 	})
// 	    // db.collection('users').updateOne({
//     //     _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
//     // }, {
//     //     $inc: {
//     //         age: 1
//     //     }
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('tasks').updateMany({
// 			completed: false
// 	}, {
// 			$set: {
// 					completed: true
// 			}
// 	}).then((result) => {
// 			console.log(result.modifiedCount)
// 	}).catch((error) => {
// 			console.log(error)
// 	})
// 	 // db.collection('users').deleteMany({
//     //     age: 27
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('tasks').deleteOne({
// 			description: "Clean the house"
// 	}).then((result) => {
// 			console.log(result)
// 	}).catch((error) => {
// 			console.log(error)
// 	})

// })



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<Siham758>@cluster0.gtzle.mongodb.net/<invoiceTracker>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
