'use strict';

class RosterService{
	static getRosters(){
		return $.getJSON('/rosters');
	}

	static getRoster(id){
		return $.getJSON(`/roster/${id}`);
	}

	static addRoster(roster){
		for(let field in roster){
			console.log('ROSTER: '+roster[field]);
		}
		return $.ajax({
			method: 'POST',
			url: '/rosters',
			contentType: 'application/json',
			data: JSON.stringify(roster),
			dataType: 'json'
		});
	}

	static updateRoster(updatedRoster){
		//ajax returns a promise return this:
		return $.ajax({
					method: 'PUT',
					url: `/rosters/${updatedRoster.id()}`,
					contentType: 'application/json',
					data: updatedRoster
				});
	}

	static deleteRoster(id){
		return $.ajax({
					method: 'DELETE',
					url: `/rosters/${id}`
				});
	}
}