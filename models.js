const mongoose = require('mongoose');
//const integerValidator = require('mongoose-integer');

//Schema for Players
const playerSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  status: {type: String, default: 'active'},
  preferredPosition: {type: String, default: 'Not Specified'}
});

playerSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`.trim();
});

playerSchema.methods.playerRepr = function() {
  return {
    id: this._id,
    name: this.fullName,
    status: this.status,
    preferredPosition: this.preferredPosition
  };
}

//Schema for Formations
const formationSchema = mongoose.Schema({
  name: String, 
  layers: [{type: Number, required: true}],
});

/*formationSchema.virtual('formationName').get(function(){
  return `${this.getName()}`;
});*/

formationSchema.virtual('amountOfLayers').get(function(){
  return `${this.layers.length}`;
});

/*formationSchema.methods.getName = function() {
  let name=this.name;
  console.log(!name);
  console.log(name);
  if(!name){
    name='';
    for(let i=0; i < this.layers.length; i++){
      name+=this.layers[i];
      if(i < (this.layers.length-1))
        name+='-';
    }
  }
  return name;
}*/

formationSchema.methods.formationRepr = function() {
  return {
    id: this._id,
    name: this.name,
    layers: this.layers
  };
}

//formationSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });

const Player = mongoose.model('Player', playerSchema);
const Formation = mongoose.model('Formation', formationSchema);

module.exports = {Player, Formation};