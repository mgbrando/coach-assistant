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
	console.log('SEED DATA: '+seedData[0].firstName);
  	return Roster.insertMany(seedData);
}

function dropDatabase(){
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

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

	function checkKeys(itemCollection, expectedKeys){
		itemCollection.forEach(type => {
			type.should.be.a('object');
			type.should.include.keys(expectedKeys);
		});
	}

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
					//checkKeys(res.body.players, expectedKeys);
					//console.log('All rosters: '+res.body.players.status);
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
					return chai.request(app).get(`/rosters/${roster.id}`);
				})
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					const expectedKeys = ['id', 'formationId', 'playerPositions', 'dateCreated', 'lastModified',
          'description', 'notes'];
					checkKeys([res.body], expectedKeys);
				});
		});
	});
	describe('POST endpoint', () => {
    	it('should add a new roster and return a roster representation', () => {

      		const newRoster = {
            formationId: faker.random.uuid(),
            playerPositions: {
              layer: faker.random.number(),
              position: faker.random.number(),
              playerId: faker.random.uuid(),
            },
            dateCreated: faker.date.past().toDateString(),
            lastModified: faker.date.recent().toDateString(),
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
          			res.body.should.include.keys(
            			'id', 'name', 'status', 'preferredPosition');
           			res.body.id.should.not.be.null;
                res.body.formationId.should.not.be.null;
                res.body.playerPositions.should.deep.equal(newRoster.playerPositions);
                res.body.dateCreated.should.equal(newRoster.dateCreated);
                res.body.lastModified.should.equal(newRoster.lastModified);
                res.body.description.should.equal(newRoster.description);
                res.body.notes.should.equal(newRoster.notes);

          			return Roster.findById(res.body.id).exec();
        		})
        		.then(roster => {
          			roster.formationId.should.equal(newRoster.formationId);
          			roster.playerPositions.should.deep.equal(newRoster.playerPositions);
          			roster.dateCreated.should.equal(newRoster.dateCreated);
          			roster.lastModified.should.equal(newRoster.lastModified);
                roster.description.should.equal(newRoster.description);
                roster.notes.should.equal(newRoster.notes);
        		});
    	});

	});
	describe('PUT endpoint', () => {
    	it('should update roster fields that you include in the request', () => {
      		const updateData = {
            formationId: faker.random.uuid(),
            playerPositions: {
              layer: faker.random.number(),
              position: faker.random.number(),
              playerId: faker.random.uuid(),
            },
            dateCreated: faker.date.past().toDateString(),
            lastModified: faker.date.recent().toDateString(),
            description: faker.lorem.sentence(),
            notes: faker.lorem.sentences()
          };

      		return Roster
        		.findOne()
        		.exec()
        		.then(roster => {
          			updateData.id = roster.id;
					return chai.request(app)
            			.put(`/rosters/${roster.id}`)
            			.send(updateData);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Roster.findById(updateData.id).exec();
        		})
        		.then(roster => {
        		    String(roster._id).should.equal(updateData.id)
     				    roster.formationId.should.equal(updateData.formationId)
          			roster.playerPositions.should.deep.equal(updateData.playerPositions);
          			roster.dateCreated.should.equal(updateData.dateCreated);
          			roster.lastModified.should.equal(updateData.lastModified);
                roster.description.should.equal(updateData.description);
                roster.notes.should.equal(updateData.notes);
          		});
    	});
	});
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