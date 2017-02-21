'use strict';

class Roster{

	constructor(rosterObject /*= throw new Error('playerObject is required')*/){
		this.deconstructs(rosterObject);
	}

	/*constructor(id, firstName, lastName, status = 'active', preferredPosition = 'Not Specified'){
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._status = status;
		this._preferredPosition = preferredPosition;
	}

	  formationId: {type: String, required: true},
  playerPositions: [{
    layer: {type: Number, required: true},
    position: {type: Number, required: true},
    playerid: {type: String, required: true}
    }],
  dateCreated: {type: String, default: new Date().toDateString()},
  lastModified: {type: String default: ''},
  description: {type: String, default: ''},
  notes: {type: String, default: ''}*/

	deconstructs(rosterObject){
		this._id = rosterObject.id;
		this._formationId = rosterObject.formationId;
		this._playerPositions = rosterObject.playerPositions;
		this._dateCreated = rosterObject.dateCreated;
		this._lastModified = rosterObject.lastModified;
		this.description = rosterObject.description;
		this.notes = rosterObject.notes;
	}

    //Getters and setters
	get id(){
		return this._id;
	}
	set id(id){
		this._id = id;
	}

	get formationId(){
		return this._formationId;
	}
	set formationId(fID){
		this._formationId = fID;
	}

	get playerPositions(){
		return this._playerPositions;
	}

	set playerPositions(playerPos){
		this._playerPositions = playerPos;
	}

	get dateCreated(){
		return this._dateCreated;
	}

	get lastModified(){
		return this._lastModified;
	}

	set lastModified(lastMod){
		this._lastModified = lastMod;
	}

	get description(){
		return this._description;
	}

	set description(descript){
		this._description = descript;
	}

	get notes(){
		return this._description;
	}

	set notes(words){
		this._notes = words;
	}

	getHtmlRepr(){
		return `<div class="roster">
					<div>${this._description}</div>
					<div>Date Created: ${this._dateCreated}</div>
					<div>Last Modified: ${this._lastModified}</div>
					<div>
						<button type="button" class="js-activate-roster activate-roster">Activate</button>
						<button type="button" class="js-delete-roster delete-roster">Delete</button>
					</div>
				</div>`;
	}
}