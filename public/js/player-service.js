'use strict';

//Player service used to interact with the player collection in the database
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
			data: JSON.stringify(player),
			dataType: 'json'
		});
	}

	static updatePlayer(updatedPlayer){
		//ajax returns a promise return this:
		return $.ajax({
					method: 'PUT',
					url: `/players/${updatedPlayer.id}`,
					contentType: 'application/json',
					data: JSON.stringify(updatedPlayer)
				});
	}

	static deletePlayer(id){
		return $.ajax({
					method: 'DELETE',
					url: `/players/${id}`
				});
	}
}