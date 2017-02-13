const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL} = require('../config');
const {Player} = require('../models');
const {app, runServer, closeServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);


function seedPlayerData(){
	console.info('seeding player data');
  	const seedData = [];
  	for (let i=1; i<=10; i++) {
    	seedData.push({
    		firstName: faker.name.firstName(),
        	lastName: faker.name.lastName(),
    		status: faker.lorem.word(),
      		preferredPosition: faker.lorem.word()
    	});
	}
	console.log('SEED DATA: '+seedData[0].firstName);
  	return Player.insertMany(seedData);
}

function dropDatabase(){
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

describe('players api', function(){

	before(function(){
		return runServer();
	});

	beforeEach(function(){
		return seedPlayerData();
	});

	afterEach(function(){
		return dropDatabase();
	});

	after(function(){
		return closeServer();
	});

	function checkKeys(itemCollection, expectedKeys){
		itemCollection.forEach(type => {
			type.should.be.a('object');
			type.should.include.keys(expectedKeys);
		});
	}

	describe('GET endpoint', () => {
		it('should list all players with correct fields on GET', () => {
			let res;
			return chai.request(app)
				.get('/players')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.should.be.json;	
					res.body.players.should.be.a('array');

					res.body.players.length.should.be.at.least(1);

					const expectedKeys = ['id', 'name', 'status', 'preferredPosition'];
					//checkKeys(res.body.players, expectedKeys);
					console.log('All players: '+res.body.players.status);
					res.body.players.forEach(player => {
						console.log('Value for player: '+player);
						player.should.be.a('object');
						player.should.include.keys(expectedKeys);
					});

					return Player.count();		
				})
				.then(count => {
					res.body.players.should.have.length.of(count);
				});
		});

		it('should list a single player with correct fields when given their id', () => {
			let player;

			return Player
				.findOne()
				.exec()
				.then(_player => {
					player = _player;
					return chai.request(app).get(`/players/${player.id}`);
				})
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					const expectedKeys = ['id', 'name', 'status', 'preferredPosition'];
					checkKeys([res.body], expectedKeys);
				});
		});
	});
	describe('POST endpoint', () => {
    	it('should add a new player and return a player representation', () => {

      		const newPlayer = {
          		firstName: faker.name.firstName(),
          		lastName: faker.name.lastName(),
          		status: faker.lorem.word(),
          		preferredPosition: faker.lorem.word()
      		};

      		return chai.request(app)
        		.post('/players')
        		.send(newPlayer)
        		.then(res => {
          			res.should.have.status(201);
          			res.should.be.json;
          			res.body.should.be.a('object');
          			res.body.should.include.keys(
            			'id', 'name', 'status', 'preferredPosition');
           			res.body.id.should.not.be.null;
          			res.body.status.should.equal(newPlayer.status);
          			res.body.preferredPosition.should.equal(newPlayer.preferredPosition);
          			res.body.name.should.equal(`${newPlayer.firstName} ${newPlayer.lastName}`);
          			return Player.findById(res.body.id).exec();
        		})
        		.then(player => {
          			player.firstName.should.equal(newPlayer.firstName);
          			player.lastName.should.equal(newPlayer.lastName);
          			player.status.should.equal(newPlayer.status);
          			player.preferredPosition.should.equal(newPlayer.preferredPosition);
        		});
    	});

	});
	describe('PUT endpoint', () => {
    	it('should update player fields that you include in the request', () => {
      		const updateData = {
      			firstName: "David",
      			lastName: "Beckham",
      			status: "absent",
      			preferredPosition: "center midfielder"
      		};

      		return Player
        		.findOne()
        		.exec()
        		.then(player => {
          			updateData.id = player.id;
					return chai.request(app)
            			.put(`/players/${player.id}`)
            			.send(updateData);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Player.findById(updateData.id).exec();
        		})
        		.then(player => {
        			String(player._id).should.equal(updateData.id)
     				player.firstName.should.equal(updateData.firstName)
          			player.lastName.should.equal(updateData.lastName);
          			player.status.should.equal(updateData.status);
          			player.preferredPosition.should.equal(updateData.preferredPosition);
          		});
    	});
	});
	describe('DELETE endpoint', () => {
    	
    	it('should delete a player given an id', () => {

      		let player;

      		return Player
        		.findOne()
        		.exec()
        		.then(_player => {
          			player = _player;
          			return chai.request(app).delete(`/players/${player.id}`);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Player.findById(player.id);
        		})
        		.then(_player => {
          			should.not.exist(_player);
        		});
    		});
	});
});