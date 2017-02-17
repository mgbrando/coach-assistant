const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Roster} = require('../models');

//Method that returns an array of roster objects from the database
router.get('/', (req, res) => {
	Roster
		.find()
		.exec()
		.then(rosters => {
			console.log(rosters);
			res.json({
				rosters: rosters.map(roster => {
					return roster.rosterRepr();
				})
			});
		});
});

//Method that returns a roster object from the database given that roster's id
router.get('/:id', (req, res) => {
	console.log(req.params.id);
	Roster
		.findById(req.params.id)
		.exec()
		.then(roster => {
			console.log(roster);
			res.json(roster.rosterRepr());
		});
});

//Method that stores a roster in the database and then returns that roster representation
router.post('/', jsonParser, (req, res) => {
	//const requiredFields = ['playerPositions', 'formation'];
	/*for(let i = 0; i < requiredFields.length; i++){
		const field = requiredFields[i];
		console.log(field);
		console.log(req.body);
		if(!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).json({message: message});
		}
	}
*/
	if(!('formationId' in req.body)){
			const message = `Missing \` formationId \` in request body`;
			console.error(message);
			return res.status(400).json({message: message});
	}

	for(let field in req.body)
		console.log(req.body[field]);
	Roster
		.create({
			formationId: req.body.formationId,
			playerPositions: req.body.playerPositions,
			dateCreated: new Date().toDateString(),
			description: req.body.description,
			notes: req.body.notes
		})
		.then(roster => {res.status(201).json(roster.rosterRepr());})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

//Method that updates a roster's information
router.put('/:id', jsonParser, (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
		const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.error(message);
		return res.status(400).json({message: message});
 	}
 	const toUpdate = {};
 	const updatableFields = ['formationId', 'playerPositions', 'description', 'notes'];
 	updatableFields.forEach(field => {
 		if(field in req.body)
 			toUpdate[field] = req.body[field];
 	});
 	toUpdate['lastModified'] = new Date().toDateString();

 	Roster
 		.findByIdAndUpdate(req.params.id, {$set: toUpdate})
 		.exec()
 		.then(roster => {
 			res.status(204).end();
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

router.delete('/:id', (req, res) => {
	Roster
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(roster => {
			console.log(`Deleted roster \`${req.params.id}\``);
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Service Error: '+err});
		});
});

module.exports = router;