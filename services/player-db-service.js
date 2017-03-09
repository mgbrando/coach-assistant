'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Player, Formation} = require('../models');
class PlayerDBService{
	static delete(playerId){	
		Player
			.findByIdAndRemove(playerId)
			.exec()
			.then(this.removePlayerFromFormations(playerId))
			.then(() => {
				console.log(`Deleted shopping list item \`${req.params.ID}\``);
				res.status(204).end();
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({message: 'Internal Service Error: '+err});
			});	
	}

    removePlayerFromFormations(playerId){
    	
	}
}