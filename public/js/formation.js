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
		return this._firstName;
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

	getHtmlRepr(){
		elementNumber = elementNumber || '';
		let html = `<div class="formation">
						<header class="formation-header">
							${this.name()}
						</header>
						<div class="update-details hidden">
							<form id="js-formation-form formation-form">`;
		for(let i = 0; i < this.layers().length; i++){
			html += `<div class="layer"><label for="${i}">Layer ${i+1}</label>
					<select id="${i}">`;
			for(let i = 0; i < this.layers().length; i++)
					html += `<option value=${i+1}>${i+1}</option>`;
			html+=`</select></div>`
		}
		html +=	`	</div>
					<footer class="formation-footer"><button</footer>
				</div>`;
	}
}

//module.exports = Formation;