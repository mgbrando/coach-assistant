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
	get name(){
		return this._name;
	}
	set name(name){
		this._name = name;
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
		let playerRowHtml = `<div class="row" data-playerId="${this._id}">
								<div class="col-xs-2" contenteditable="true">${this._firstName}</div>
								<div class="col-xs-2" contenteditable="true">${this._lastName}</div>
								<div class="col-xs-2" contenteditable="true">${this._status}</div>
								<div class="col-xs-2" contenteditable="true">${this._preferredPosition}</div>
								<div class="col-xs-2"><button class="js-update-button" type="button">Update</button></div>
								<div class="col-xs-2"><button class="js-delete-button" type="button">Delete</button></div>
							</div>`;
		/*`<div class="row" data-playerId="${this._id}">
								<div class="col-xs-5ths" contenteditable="true">${this._firstName}</div>
								<div class="col-xs-5ths" contenteditable="true">${this._lastName}</div>
								<div class="col-xs-5ths" contenteditable="true">${this._status}</div>
								<div class="col-xs-5ths" contenteditable="true">${this._preferredPosition}</div>
								<div class="col-xs-5ths"><button class="js-update-button" type="button">Update</button></div>
								<div class="col-xs-5ths"><button class="js-delete-button" type="button">Delete</button></div>
							</div>`;*/
		return playerRowHtml;
	}
	getPlayerDraggableDiv(){
		return `<div class="js-player-filled player-filled" data-playerId="${this._id}">${getFullName()}</div>`;
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