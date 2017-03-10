'use strict';

class Player{

	constructor(playerObject){
		this.deconstructs(playerObject);
	}

	deconstructs(playerObject){
		this._id = playerObject.id;
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
		return `<li class="js-player-list-item js-player-item" data-value="${this._id}"><a class="js-nav-button nav-button" href="#">${this.getFullName()}</a></li>`;
	}
}
