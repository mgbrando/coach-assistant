'use strict';

class Formation{

	constructor(formationObject){
		this.deconstructs(formationObject);
	}

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
		return `<li class="js-formation-list-item js-formation-item" data-value="${this._id}"><a class="js-nav-button nav-button" href="#">${this._name}</a></li>`;
	}
	getHtmlRepr(){
		return `<div class="col-xs-4 formation-container"><div class="noselect js-formation formation ui-widget-content" data-formationId="${this._id}"><span class="formation-name-text">${this._name}</span></div></div>`;
	}
}
