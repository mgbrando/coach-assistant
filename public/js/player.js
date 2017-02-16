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
		this._firstName = firstName;
		this._lastName = lastName;
		this._status = status || 'active';
		this._preferredPosition = preferredPosition || 'Not Specified';
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
		return `${this.firstName()} ${this.lastName()}`;
	}
	getHtmlRepr(){
		return `<div class="player-row">
						<div>${this.getFullName()}</div>
						<div>${this.status()}</div>
						<div>${this.preferredPosition()}</div>
						<div>
							<button type="button" class="js-update-player update-player">Update</button>
							<button type="button" class="js-delete-player delete-player">Delete</button>
						</div>
					</div>`;
	}
}

//module.exports = Player;