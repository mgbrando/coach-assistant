'use strict';

class Formation{

	constructor(formationObject /*= throw new Error('playerObject is required')*/){
		this.deconstructs(formationObject);
	}

	/*constructor(id, name, layers){
		this._id = id;
		this._name = name;
		this._layers= layers;
	}*/

	deconstructs(formationObject){
		this._id = formationObject.id;
		this._name = formationObject.name;
		this._layers = formationObject.layers;
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

	get layers(){
		return this._layers;
	}

	set lastName(layers){
		this._layers = layers;
	}
	getFormationPageHtmlRepr(){
		let html=`<div class="js-formation formation" data-formationId="${this._id}">
				  	<header>${this._name}</header>
				  	<footer class="js-formation-footer formtation-footer"><button type="button">Delete</button></footer>
				  <div>`;
	}
	getFormationListItemRepr(){
		//return `<option value="${this._id}">${this._name}</option>`;
		return `<li class="js-formation-list-item js-formation-item" data-value="${this._id}"><a class="js-nav-button nav-button" href="#">${this._name}</a></li>`;
	}
	getHtmlRepr(elementNumber){
		elementNumber = elementNumber || '';
		let html = `<div class="formation" data-elementNumber="${elementNumber}">
						<header class="formation-header">
							${this._name}
						</header>
						<div class="update-details hidden">
							<form id="js-formation-form">`;
		for(let i = 0; i < this._layers.length; i++){
			html += `<div class="layer"><label for="${i}">Layer ${i+1}</label>
					<select id="${i}">`;
			for(let i = 0; i < this._layers.length; i++)
					html += `<option value="${i+1}">${i+1}</option>`;
			html+=`</select></div>`
		}
		html +=	`</form></div>
				<footer class="formation-footer"></footer>
				</div>`;
		return html;		
	}
}

//module.exports = Formation;