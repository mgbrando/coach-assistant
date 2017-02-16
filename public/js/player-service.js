'use strict';

class PlayerService{
	static getPlayers(callback){
		return $.getJSON('/players');
	}

	static getPlayer(id){
		return $.getJSON(`/players/${id}`);
	}

	static addPlayer(player){
		return $.ajax({
			type: 'POST',
			url: '/players',
			data: player,
			dataType: 'json'
		});
	}

	static updatePlayer(updatedPlayer){
		//ajax returns a promise return this:
		return $.ajax({
					type: 'PUT',
					url: `/players/${updatedPlayer.id()}`,
					data: updatedPlayer
				});
	}

	static deletePlayer(id){
		return $.ajax({
					type: 'DELETE',
					url: `/players/${id}`
				});
	}
}

//module.exports = PlayerService;