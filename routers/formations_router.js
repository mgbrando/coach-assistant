const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Formation} = require('../models');

//Function that determines whether or not an array contains only integers
function onlyIntegersInArray(arr){
	for(let i = 0; i < arr.length; i++){
		console.log("INSIDE LOOP: "+Number.isInteger(arr[i]));
		if(!(Number.isInteger(arr[i]))){
			console.log('INSIDE THE FALSE');
			return false;
		}
	}
	return true;
}
//Method that returns an array of formation objects from the database
router.get('/', (req, res) => {
	Formation
		.find()
		.exec()
		.then(formations => {
			res.json({
				formations: formations.map(formation => {
					return formation.formationRepr();
				})
			});
		});
});

//Method that returns a formation object from the database given that formation's id
router.get('/:id', (req, res) => {
	Formation
		.findById(req.params.id)
		.exec()
		.then(formation => {
			res.json(formation.formationRepr());
		});
});

//Function used to get the default name of a formation
function getDefaultName(layers){
	let name='';
    for(let i=0; i < layers.length; i++){
      name+=layers[i];
      if(i < (layers.length-1))
        name+='-';
    }
    return name;
}

//Method that stores a formation in the database and then returns that formation representation
router.post('/', jsonParser, (req, res) => {
	const requiredField = 'layers';
	if(!(requiredField in req.body)){
		const message = `Missing \`${requiredField}\` in request body`;
		console.error(message);
		return res.status(400).json({message: message});
	}
	if(req.body[requiredField].length < 1 || req.body[requiredField].length > 10){
		const message = `\`${requiredField}\` field in request body must have a length between 1 and 10`;
		console.error(message);
		return res.status(400).json({message: message});
	}
	if(req.body[requiredField] < 1 || req.body[requiredField] > 10){
		for(let i = 0; i<req.body[requiredField].length; i++){
			const peoplePerLayer = req.body[requiredField][i];
			if(!(Number.isInteger(peoplePerLayer) && peoplePerLayer > 0 && peoplePerLayer < 10)){
				const message = `\`${requiredField}\` field in request body must have a length between 1 and 10`;
				console.error(message);
				return res.status(400).json({message: message});
			}
		}
	}
	if(!onlyIntegersInArray(req.body[requiredField])){
		const message = `\`${requiredField}\` field in request body must be an array containing only integers`;
		return res.status(400).json({message: message});
	}
	console.log('MADE IT!');
	Formation
		.create({
			name: req.body.name || getDefaultName(req.body.layers),
			layers: req.body.layers
		})
		.then(formation => {res.status(201).json(formation.formationRepr());})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error: '+err});
		});
});

//Method that updates a formation's information
router.put('/:id', jsonParser, (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
		const message = `Request path id (${req.params.id}) and request body id `
		`(${req.body.id}) must match`;
		console.error(message);
		return res.status(400).json({message: message});
 	}
 	if(req.body['layers'] && !(onlyIntegersInArray(req.body['layers']))){
 		const message = `\`layers\` field in request body must be an array containing only integers`;
		return res.status(400).json({message: message});
	}
 	const toUpdate = {};
 	const updatableFields = ['name', 'layers'];
 	updatableFields.forEach(field => {
 		if(field in req.body)
 			toUpdate[field] = req.body[field];
 	});

 	Formation
 		.findByIdAndUpdate(req.params.id, {$set: toUpdate})
 		.exec()
 		.then(formation => {
 			res.status(204).end();
 		})
 		.catch(err => {
 			console.error(err);
 			res.status(500).json({message: 'Internal Service Error: '+err});
 		});
});

//Method that deletes a group of formations
router.delete('/bulk-delete', jsonParser, (req, res) => {

	const formationsArray = req.body.formationsArray;

	Formation
		.remove({_id: {$in: formationsArray}})
		.exec()
		.then(() => {
			res.status(204).end();
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal Service Error: '+err});
		});
});

//Method that deletes a formation's information
router.delete('/:id', (req,res) => {
	Formation
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(formation => {
			console.log(`Deleted formation \`${req.params.id}\``);
			res.status(204).end();
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Service Error: '+err});
		});	
});

module.exports = router;