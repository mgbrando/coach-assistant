const mongoose = require('mongoose');
//const integerValidator = require('mongoose-integer');

//Schema for Players
const playerSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  status: {type: String, default: 'active'},
  preferredPosition: {type: String, default: 'Not Specified'}
});

playerSchema.methods.playerRepr = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    status: this.status,
    preferredPosition: this.preferredPosition
  };
}

//Schema for Formations
const formationSchema = mongoose.Schema({
  name: String, 
  layers: [{type: Number, required: true}], 
});

formationSchema.virtual('amountOfLayers').get(function(){
  return `${this.layers.length}`;
});

formationSchema.methods.formationRepr = function() {
  return {
    id: this._id,
    name: this.name,
    layers: this.layers
  };
}

//formationSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });
const rosterSchema = mongoose.Schema({
  formationId: {type: String, required: true},
  playerPositions: [{
    layer: {type: Number, required: true},
    position: {type: Number, required: true},
    playerId: {type: String, required: true}
    }],
    //dateCreated: { type: Date, default: Date.now}
  dateCreated: {type: String, default: new Date().toDateString()},
  lastModified: {type: String, default: ''},
  description: {type: String, default: ''},
  notes: {type: String, default: ''}
});

rosterSchema.methods.rosterRepr = function() {
  return {
    id: this._id,
    formationId: this.formationId,
    playerPositions: this.playerPositions,
    dateCreated: this.dateCreated,
    lastModified: this.lastModified,
    description: this.description,
    notes: this.notes
  };
}

const Player = mongoose.model('Player', playerSchema);
const Formation = mongoose.model('Formation', formationSchema);
const Roster = mongoose.model('Roster', rosterSchema);

module.exports = {Player, Formation, Roster};
