'use strict';

class RosterService{
	static getRosters(callback){
		return $.getJSON('/rosters');
	}

	static getRoster(id){
		return $.getJSON(`/roster/${id}`);
	}

	static addRoster(roster){
		return $.ajax({
			type: 'POST',
			url: '/rosters',
			data: roster,
			dataType: 'json'
		});
	}

	static updateRoster(updatedRoster){
		//ajax returns a promise return this:
		return $.ajax({
					type: 'PUT',
					url: `/rosters/${updatedRoster.id()}`,
					data: updatedRoster
				});
	}

	static deleteRoster(id){
		return $.ajax({
					type: 'DELETE',
					url: `/rosters/${id}`
				});
	}
}