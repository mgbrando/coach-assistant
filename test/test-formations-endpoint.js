const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL} = require('../config');
const {Formation} = require('../models');
const {app, runServer, closeServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seedFormationData(){
  console.info('seeding formation data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
  	let layers = [];
  	let playerTotal = 1;
  	const numberOfLayers = getRandomInteger(1, 10);
  	for(let i=0; i < numberOfLayers; i++){
  		const randomInt = getRandomInteger(1, 10);
  		if((playerTotal + randomInt) > 11){
  			const finalInt = 11-playerTotal;
  			layers.push(finalInt);
  			break;
  		}
  		layers.push(randomInt);
  	}
    seedData.push({
      name: faker.lorem.word(),
      layers: layers
    });
}
  return Formation.insertMany(seedData);
}

function dropDatabase(){
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

describe('formations api', () => {

	before(function(){
		return runServer();
	});

	beforeEach(function(){
		return seedFormationData();
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
		it('should list all formations with correct fields on GET', () => {
			let res;

			return chai.request(app)
				.get('/formations')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.should.be.json;	
					res.body.formations.should.be.a('array');

					res.body.formations.length.should.be.at.least(1);

					const expectedKeys = ['id', 'name', 'layers'];
					checkKeys(res.body.formations, expectedKeys);

					return Formation.count();		
				})
				.then(count => {
					res.body.formations.should.have.length.of(count);
				});
		});

		it('should list a single formation with correct fields when given its id', () => {
			let formation;

			return Formation
				.findOne()
				.exec()
				.then(_formation => {
					formation = _formation;
					return chai.request(app).get(`/formations/${formation.id}`);
				})
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					const expectedKeys = ['id', 'name', 'layers'];
					checkKeys([res.body], expectedKeys);
				});
		});
	});

	describe('POST endpoint', () => {
    	it('should add a new formation and return a formation representation', () => {

      		const newFormation = {
          		name: 'last resort',
          		layers: [3, 4, 3]
      		};

      		let res;

      		return chai.request(app)
        		.post('/formations')
        		.send(newFormation)
        		.then(_res => {
        			res = _res;
          			res.should.have.status(201);
          			res.should.be.json;
          			res.body.should.be.a('object');
          			res.body.should.include.keys('id', 'name', 'layers');
           			res.body.id.should.not.be.null;
           			res.body.name.should.not.be.null;
           			res.body.layers.should.deep.equal(newFormation.layers);
          			res.body.name.should.equal(`${newFormation.name}`);
          			return Formation.findById(res.body.id).exec();
        		})
        		.then(formation => {
          			formation.name.should.equal(res.body.name);
          			formation.layers.should.be.a('array');
          			for(let i = 0; i < formation.length; i++)
          				formation.layers[i].should.equal(newFormation.layers[i]);
        		});
    	});

	});

	describe('PUT endpoint', () => {
    	it('should update formation fields that you include in the request', () => {
      		const updateData = {
      			name: "Crazy Town",
      			layers: [2, 2, 2, 2, 2]
      		};

      		return Formation
        		.findOne()
        		.exec()
        		.then(formation => {
          			updateData.id = formation.id;
					return chai.request(app)
            			.put(`/formations/${formation.id}`)
            			.send(updateData);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Formation.findById(updateData.id).exec();
        		})
        		.then(formation => {
        			String(formation.id).should.equal(updateData.id);
     				formation.name.should.equal(updateData.name);
     				formation.layers.should.be.a('array');
     				for(let i=0; i < formation.layers.length; i++)
     					formation.layers[i].should.equal(updateData.layers[i]);
       			});
    	});
	});

	describe('DELETE endpoints', () => {
    	
    	it('should delete a formation given an id', () => {

      		let formation;

      		return Formation
        		.findOne()
        		.exec()
        		.then(_formation => {
          			formation = _formation;
          			return chai.request(app).delete(`/formations/${formation.id}`);
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Formation.findById(formation.id);
        		})
        		.then(_formation => {
          			should.not.exist(_formation);
        		});
    	});

    	it('should delete multiple formations given an object with a sole field containing an array of ids', () => {

      		let formations;
      		let formationIds = [];

      		return Formation
        		.find()
        		.limit(3)
        		.exec()
        		.then(_formations => {
          			formations = _formations;
          			for(let i = 0; i < formations.length; i++){
          				formationIds.push(formations[i].id);
          			}

          			return chai.request(app).delete('/formations/bulk-delete').set('content-type', 'application/json').send(JSON.stringify({formationsArray: formationIds}));
        		})
        		.then(res => {
          			res.should.have.status(204);
          			return Formation
          				.find({_id: {$in: formationIds}});
        		})
        		.then(_formations => {
          			_formations.should.be.a('array');
          			_formations.should.have.length.of(0);
        		});
    	});
	});
});
