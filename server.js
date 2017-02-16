var express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

var app = express();

const {DATABASE_URL, PORT} = require('./config');
const players_router = require('./routers/players_router');
const formations_router = require('./routers/formations_router');
const rosters_router = require('./routers/rosters_router');

app.use(morgan('common'));
app.use(express.static('public'));

/*app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
});*/
app.use('/players', players_router);
app.use('/formations', formations_router);
app.use('/rosters', rosters_router);
app.use('*', (req, res) => {
	res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT){
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if(err){
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port: ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err)
			});
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing server');
				server.close(err => {
					if(err){
						return reject(err);
					}
					resolve();
				});
			});
		});
}

//app.use(express.static('public'));
/*app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});*/

if(require.main === module){
	runServer().catch(err => {console.error(err);});
}

module.exports = {app, runServer, closeServer};