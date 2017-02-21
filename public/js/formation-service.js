'use strict';

class FormationService{
	static getFormations(){
		return $.getJSON('/formations');
	}

	static getFormation(id){
		return $.getJSON(`/formations/${id}`);
	}

	static addFormation(formation){
		return $.ajax({
			method: 'POST',
			url: '/formations',
			contentType: 'application/json',
			data: formation,
			dataType: 'json'
		});
	}

	static updateFormation(updatedFormation){
		return $.ajax({
			method: 'PUT',
			url: `/formations/${updatedFormation.id()}`,
			contentType: 'application/json',
			data: updatedFormation
		});
	}

	static deleteFormation(id){
		return $.ajax({
			method: 'DELETE',
			url: `/formations/${id}`
		});
	}
}

//module.exports = FormationService;