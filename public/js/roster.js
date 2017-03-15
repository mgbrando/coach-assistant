'use strict';

//ES6 class representing a roster
class Roster{

	constructor(rosterObject){
		this.deconstructs(rosterObject);
	}

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
	getFormattedDate(dateString){
		let parsedDate = dateString.trim().split(' ');
	}
	getNumericalMonth(){
		
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

		return rosterRowHtml;
	}

	getRosterListItemRepr(){
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