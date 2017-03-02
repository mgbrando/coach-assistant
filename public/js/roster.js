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
		return this._notes;
	}

	set notes(words){
		this._notes = words;
	}
	getRosterRow(){
		let rosterRowHtml = `<tr class="roster-entry" data-rosterId="${this._id}">
								<td class="roster-field" data-type="description" contenteditable="true">${this._description}</td>
								<td class="roster-field" data-type="dateCreated">${this._dateCreated}</td>
								<td class="roster-field" data-type="lastModified">${this._lastModified}</td>
								<td class="roster-field" data-type="notes" contenteditable="true">${this._notes}</td>
								<td class="roster-action-field" data-type="button"><span class="glyphicon glyphicon-ok-sign js-roster-row-update-button"></span></td>
								<td class="roster-action-field" data-type="button"><span class="glyphicon glyphicon-remove-sign js-roster-row-delete-button"></span></td>
							</tr>`;
							/*<div class="glyphicon glyphicon-ok-sign js-update-button"></div>
							<div class="glyphicon glyphicon-remove-sign js-delete-button"></div>*/
		/*let playerRowHtml = `<div class="row player-entry" data-playerId="${this._id}">
								<div class="col-xs-2 player-field" data-type="firstName" contenteditable="true">${this._firstName}</div>
								<div class="col-xs-2 player-field" data-type="lastName"contenteditable="true">${this._lastName}</div>
								<div class="col-xs-2 player-field" data-type="status" contenteditable="true">${this._status}</div>
								<div class="col-xs-2 player-field" data-type="preferredPosition" contenteditable="true">${this._preferredPosition}</div>
								<div class="col-xs-2 player-field" data-type="button"><button class="js-update-button" type="button">Update</button></div>
								<div class="col-xs-2 player-field" data-type="button"><button class="js-delete-button" type="button">Delete</button></div>
							</div>`;*/
		return rosterRowHtml;
	}

	getRosterListItemRepr(){
		//return `<option value="${this._id}">${this._description}</option>`;
		return `<li class="js-roster-list-item roster-item" data-value="${this._id}"><a class="js-nav-button nav-button" href="#">${this._description}</a></li>`;
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
	getRosterObject(){
		return {
			id: this._id,
			formationId: this._formationId,
			playerPositions: this._playerPositions,
			dateCreated: this._dateCreated,
			lastModified: this._lastModified,
			description: this._description,
			notes: this._notes
		};
	}
}