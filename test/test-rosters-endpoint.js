const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL} = require('../config');
const {Roster} = require('../models');
const {app, runServer, closeServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

//Function that seeds the database with 10 roster entries
function seedRosterData(){
	console.info('seeding roster data');
  	const seedData = [];
  	for (let i=1; i<=10; i++) {
    	seedData.push({
    		formationId: faker.random.uuid(),
        playerPositions: {
          layer: faker.random.number(),
          position: faker.random.number(),
          playerId: faker.random.uuid(),
        },
        dateCreated: faker.date.past(),
        lastModified: faker.date.recent(),
        description: faker.lorem.sentence(),
        notes: faker.lorem.sentences()
    	});
	}
	//console.log('SEED DATA: '+seedData[0].firstName);
  	return Roster.insertMany(seedData);
}

//Function used to drop the database after testing
function dropDatabase(){
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

//Tests each roster endpoint
describe('rosters api', function(){

	before(function(){
		return runServer();
	});

	beforeEach(function(){
		return seedRosterData();
	});

	afterEach(function(){
		return dropDatabase();
	});

	after(function(){
		return closeServer();
	});

  //Function used to check that all fields are present
	function checkKeys(itemCollection, expectedKeys){
		itemCollection.forEach(type => {
			type.should.be.a('object');
			type.should.include.keys(expectedKeys);
		});
	}

  //Tests the roster GET endpoint
	describe('GET endpoint', () => {
		it('should list all rosters with correct fields on GET', () => {
			let res;
			return chai.request(app)
				.get('/rosters')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.should.be.json;	
					res.body.rosters.should.be.a('array');

					res.body.rosters.length.should.be.at.least(1);

					const expectedKeys = ['id', 'formationId', 'playerPositions', 'dateCreated', 'lastModified',
          'description', 'notes'];
					res.body.rosters.forEach(roster => {
						console.log('Value for roster: '+roster);
						roster.should.be.a('object');
						roster.should.include.keys(expectedKeys);
					});

					return Roster.count();		
				})
				.then(count => {
					res.body.rosters.should.have.length.of(count);
				});
		});

		it('should list a single roster with correct fields when given its id', () => {
			let roster;

			return Roster
				.findOne()
				.exec()
				.then(_roster => {
					roster = _roster;
          console.log(roster);
          console.log(roster.id);
					return chai.request(app).get(`/rosters/${roster.id}`);
				})
				.then(res => {
          console.log('MADE IT TO RES!');
					res.should.have.status(200);
					res.should.be.json;
					const expectedKeys = ['id', 'formationId', 'playerPositions', 'dateCreated', 'lastModified',
          'description', 'notes'];
					checkKeys([res.body], expectedKeys);
				});
		});
	});

  //Tests the roster POST endpoint
	describe('POST endpoint', () => {
    	it('should add a new roster and return a roster representation', () => {

      		const newRoster = {
            formationId: faker.random.uuid(),
            playerPositions: [{
              layer: faker.random.number(),
              position: faker.random.number(),
              playerId: faker.random.uuid(),
            }],
            description: faker.lorem.sentence(),
            notes: faker.lorem.sentences()
          };

      		return chai.request(app)
        		.post('/rosters')
        		.send(newRoster)
        		.then(res => {
          			res.should.have.status(201);
          			res.should.be.json;
          			res.body.should.be.a('object');
          			res.body.should.include.keys('id', 'formationId', 'playerPositions', 'dateCreated', 'lastModified', 
                'description', 'notes');
           			res.body.id.should.not.be.null;
                res.body.formationId.should.not.be.null;
                res.body.playerPositions[0].layer.should.equal(newRoster.playerPositions[0].layer);
                res.body.playerPositions[0].position.should.equal(newRoster.playerPositions[0].position);
                res.body.playerPositions[0].playerId.should.equal(newRoster.playerPositions[0].playerId);
                res.body.dateCreated.should.equal(new Date().toDateString());
                res.body.lastModified.should.equal('');
                res.body.description.should.equal(newRoster.description);
                res.body.notes.should.equal(newRoster.notes);

          			return Roster.findById(res.body.id).exec();
        		})
        		.then(roster => {
          			roster.formationId.should.equal(newRoster.formationId);
          			//roster.playerPositions[0].should.deep.equal(newRoster.playerPositions[0]);
                roster.playerPositions[0].layer.should.equal(newRoster.playerPositions[0].layer);
                roster.playerPositions[0].position.should.equal(newRoster.playerPositions[0].position);
                roster.playerPositions[0].playerId.should.equal(newRoster.playerPositions[0].playerId);
          			roster.dateCreated.should.equal(new Date().toDateString());
          			roster.lastModified.should.equal('');
                roster.description.should.equal(newRoster.description);
                roster.notes.should.equal(newRoster.notes);
        		});
    	});

	});

  //Tests the roster PUT endpoint
	describe('PUT endpoint', () => {
    	it('should update roster fields that you include in the request', () => {
      		const updateData = {
            formationId: faker.random.uuid(),
            playerPositions: [{
              layer: faker.random.number(),
              position: faker.random.number(),
              playerId: faker.random.uuid(),
            }],
            description: faker.lorem.sentence(),
            notes: faker.lorem.sentences()
          };

      		return Roster
        		.findOne()
        		.exec()
        		.then(roster => {
          			updateData.id = roster.id;
                console.log('Roster: '+roster.lastModified);
                console.log('updateData: '+updateData.lastModified);
					 return chai.request(app)
            			.put(`/rosters/${roster.id}`)
            			.send(updateData);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Roster.findById(updateData.id).exec();
        		})
        		.then(roster => {
        		    String(roster._id).should.equal(updateData.id);
     				    roster.formationId.should.equal(updateData.formationId);
                updateData.playerPositions[0]._id = roster.playerPositions[0]._id;
                roster.playerPositions[0].layer.should.equal(updateData.playerPositions[0].layer);
                roster.playerPositions[0].position.should.equal(updateData.playerPositions[0].position);
                roster.playerPositions[0].playerId.should.equal(updateData.playerPositions[0].playerId);
          			roster.dateCreated.should.not.be.null;
          			roster.lastModified.should.equal(new Date().toDateString());
                roster.description.should.equal(updateData.description);
                roster.notes.should.equal(updateData.notes);
          		});
    	});
	});

  //Tests the roster DELETE endpoint
	describe('DELETE endpoint', () => {
    	
    	it('should delete a roster given an id', () => {

      		let roster;

      		return Roster
        		.findOne()
        		.exec()
        		.then(_roster => {
          			roster = _roster;
          			return chai.request(app).delete(`/rosters/${roster.id}`);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Roster.findById(roster.id);
        		})
        		.then(_roster => {
          			should.not.exist(_roster);
        		});
    		});
	});
});