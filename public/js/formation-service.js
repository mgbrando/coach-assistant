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
			data: JSON.stringify(formation),
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
	static deleteFormations(formationsArray){
		return $.ajax({
			method: 'DELETE',
			url: '/formations/bulk-delete',
			contentType: 'application/json',
			data: JSON.stringify({formationsArray: formationsArray})
		});
	}
}

//module.exports = FormationService;