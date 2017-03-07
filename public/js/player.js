'use strict';

class Player{

	constructor(playerObject /*= throw new Error('playerObject is required')*/){
		this.deconstructs(playerObject);
	}

	/*constructor(id, firstName, lastName, status = 'active', preferredPosition = 'Not Specified'){
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._status = status;
		this._preferredPosition = preferredPosition;
	}*/

	deconstructs(playerObject){
		this._id = playerObject.id;
		//this._name = playerObject.name;
		this._firstName = playerObject.firstName;
		this._lastName = playerObject.lastName;
		this._status = playerObject.status || 'active';
		this._preferredPosition = playerObject.preferredPosition || 'Not Specified';
	}

    //Getters and setters
	get id(){
		return this._id;
	}
	set id(id){
		this._id = id;
	}
	get firstName(){
		return this._firstName;
	}
	set firstName(firstName){
		this._firstName = firstName;
	}

	get lastName(){
		return this._lastName;
	}

	set lastName(lastName){
		this._lastName = lastName;
	}

	get status(){
		return this._status;
	}
	set status(status){
		this._status = status;
	}

	get preferredPosition(){
		return this._preferredPosition;
	}

	set preferredPosition(preferredPosition){
		this._preferredPosition = preferredPosition;
	}
	getFullName(){
		return `${this._firstName} ${this._lastName}`;
	}
	getPlayerRow(){
		let playerRowHtml = `<tr class="player-entry" data-playerId="${this._id}">
								<td class="player-field" data-type="firstName" contenteditable="true">${this._firstName}</td>
								<td class=" player-field" data-type="lastName"contenteditable="true">${this._lastName}</td>
								<td class=" player-field" data-type="status" contenteditable="true">${this._status}</td>
								<td class=" player-field" data-type="preferredPosition" contenteditable="true">${this._preferredPosition}</td>
								<td class=" player-action-field" data-type="button"><span class="glyphicon glyphicon-ok-sign js-update-button"></span></td>
								<td class=" player-action-field" data-type="button"><span class="glyphicon glyphicon-remove-sign js-delete-button"></span></td>
							</tr>`;
		/*let playerRowHtml = `<div class="row player-entry" data-playerId="${this._id}">
								<div class="col-xs-2 player-field" data-type="firstName" contenteditable="true">${this._firstName}</div>
								<div class="col-xs-2 player-field" data-type="lastName"contenteditable="true">${this._lastName}</div>
								<div class="col-xs-2 player-field" data-type="status" contenteditable="true">${this._status}</div>
								<div class="col-xs-2 player-field" data-type="preferredPosition" contenteditable="true">${this._preferredPosition}</div>
								<div class="col-xs-2 player-field" data-type="button"><button class="js-update-button" type="button">Update</button></div>
								<div class="col-xs-2 player-field" data-type="button"><button class="js-delete-button" type="button">Delete</button></div>
							</div>`;*/
		return playerRowHtml;
	}
	getPlayerDraggableDiv(){
		return `<div class="js-player-filled player-filled ui-widget-content noselect" data-playerId="${this._id}">${this.getFullName()}</div>`;
	}
	getPlayerObject(){
		return {id: this._id, 
				firstName: this._firstName,
				lastName: this._lastName,
				status: this._status,
				preferredPosition: this._preferredPosition
				};
	}
	getPlayerListItemRepr(){
		//return `<option value="${this._id}">${this._name}</option>`;
		return `<li class="js-player-list-item js-player-item" data-value="${this._id}"><a class="js-nav-button nav-button" href="#">${this.getFullName()}</a></li>`;
	}
	/*getHtmlRepr(){
		return `<div class="player-row">
						<div>${this._name}</div>
						<div>${this._status}</div>
						<div>${this._preferredPosition}</div>
						<div>
							<button type="button" class="js-update-player update-player">Update</button>
							<button type="button" class="js-delete-player delete-player">Delete</button>
						</div>
					</div>`;
	}*/
}

//module.exports = Player;