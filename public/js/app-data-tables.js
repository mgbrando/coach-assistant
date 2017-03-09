'use strict';

class PlayerService{
	static retrievePlayers(callback){
		$.getJSON('/players', callback);
	}

	static retrievePlayer(id, callback){
		$.getJSON(`/players/${id}`, callback);
	}

	static storePlayer(player){
		return $.ajax({
			type: 'POST',
			url: '/players',
			data: player,
			dataType: 'json'
		});
	}

	static updatePlayer(updatedPlayer, playerList = null, callback = null){
		//ajax returns a promise return this:
		$.ajax({
			type: 'POST',
			url: `/players/${updatedPlayer.id()}`,
			data: newPlayerInfo,
			success: function(results){
				if(callback)
				callback(results);
			}
		});
	}

	static deletePlayer(id, callback){
		$.ajax({
			type: 'DELETE',
			url: `/players/${id}`,
			success: callback
		});
	}
}

class FormationService{
	static retrieveFormations(callback){
		$.getJSON('/formations', callback);
	}

	static retrieveFormation(id, callback){
		$.getJSON(`/formations/${id}`, callback);
	}

	static storeFormation(player, callback){
		$.ajax({
			type: 'POST',
			url: '/players',
			data: player,
			success: callback,
			dataType: 'json'
		});
	}

	static updateFormation(updatedFormation, callback){
		$.ajax({
			type: 'POST',
			url: `/formations/${updatedFormation.id()}`,
			data: updatedFormation,
			success: callback
		});
	}

	static deleteFormation(id, callback){
		$.ajax({
			type: 'DELETE',
			url: `/players/${id}`,
			success: callback
		});
	}
}