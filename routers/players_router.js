const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Player} = require('../models');

//Method that returns an array of player objects from the database
router.get('/', (req, res) => {
	Player
		.find()
		.exec()
		.then(players => {
			console.log(players);
			res.json({
				players: players.map(player => {
					return player.playerRepr();
				})
			});
		});
});

//Method that returns a player object from the database given that players's id
router.get('/:id', (req, res) => {
	console.log(req.params.id);
	Player
		.findById(req.params.id)
		.exec()
		.then(player => {
			console.log(player);
			res.json(player.playerRepr());
		});
});

//Method that stores a player in the database and then returns that player representation
router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['firstName', 'lastName'];
	for(let i = 0; i < requiredFields.length; i++){
		const field = requiredFields[i];
		console.log(field);
		console.log(req.body);
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).json({message: message});
		}
	}

	Player
		.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			status: req.body.status,
			preferredPosition: req.body.preferredPosition
		})
		.then(player => {res.status(201).json(player.playerRepr());})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

//Method that updates a player's information
router.put('/:id', jsonParser, (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
		const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.error(message);
		return res.status(400).json({message: message});
 	}
 	const toUpdate = {};
 	const updatableFields = ['firstName', 'lastName', 'status', 'preferredPosition'];
 	updatableFields.forEach(field => {
 		if(field in req.body)
 			toUpdate[field] = req.body[field];
 	});

 	Player
 		.findByIdAndUpdate(req.params.id, {$set: toUpdate})
 		.exec()
 		.then(player => {
 			res.status(204).end();
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.delete('/:id', (req, res) => {
	Player
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(player => {
			console.log(`Deleted shopping list item \`${req.params.ID}\``);
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Service Error: '+err});
		});	
});

module.exports = router;



