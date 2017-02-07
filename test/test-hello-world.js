const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

describe('connection to root starting page', function(){
	it('should return a static html page', function(){
		chai.request(app)
			.get('/')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.html;
				done();
		});
	});
});