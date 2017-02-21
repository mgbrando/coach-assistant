'use strict';

class PlayerService{
	static getPlayers(){
		return $.getJSON('/players');
	}

	static getPlayer(id){
		return $.getJSON(`/players/${id}`);
	}

	static addPlayer(player){
		console.log('PLAYER: '+player);
		console.log(`${player.firstName} ${player.lastName} ${player.preferredPosition} ${player.status}`);
		return $.ajax({
			method: 'POST',
			url: '/players',
			contentType: 'application/json',
			data: player,
			dataType: 'json'
		});
	}

	static updatePlayer(updatedPlayer){
		//ajax returns a promise return this:
		return $.ajax({
					method: 'PUT',
					url: `/players/${updatedPlayer.id()}`,
					contentType: 'application/json',
					data: updatedPlayer
				});
	}

	static deletePlayer(id){
		return $.ajax({
					method: 'DELETE',
					url: `/players/${id}`
				});
	}
}

//module.exports = PlayerService;