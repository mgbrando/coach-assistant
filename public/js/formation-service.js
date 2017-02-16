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
			type: 'POST',
			url: '/formations',
			data: formation,
			dataType: 'json'
		});
	}

	static updateFormation(updatedFormation){
		return $.ajax({
			type: 'PUT',
			url: `/formations/${updatedFormation.id()}`,
			data: updatedFormation
		});
	}

	static deleteFormation(id){
		return $.ajax({
			type: 'DELETE',
			url: `/formations/${id}`
		});
	}
}

//module.exports = FormationService;