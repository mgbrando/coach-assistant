'use strict';

/*const Player = require('./player');
const Formation = require('./formation');
const PlayerService = require('./player-service');
const FormationService = require('./formation-service');*/

const applicationState = {
	players: [],
	formations: [],
	rosters: []
};

function getLayers(){
	//const layers

}
function handleInitialization(){
	const players = PlayerService.getPlayers();
	players.done(function(results){
		for(let i; i < results.length; i++){
			//ask if there is a performance issue declaring this inside the loop instead of outside with let
			const player = new Player(results[i]);
			applicationState.players.push(player);
			$('.js-roster').append(player.getHtmlRepr());
		}
	});
	const formations = FormationService.getFormations();
	formations.done(function(results){
		for(let i; i < results.length; i++){
			//ask if there is a performance issue declaring this inside the loop instead of outside with let
			const formation = new Formation(results[i]);
			applicationState.formations.push(formation);
			$('.js-formation-listing').append(formation.getHtmlRepr());
		}
	});
}
function handleSideNavigation(){
	$(".button-collapse").sideNav();
	getLayers();
}

$(document).ready(function(){
	$('no-js-warning').remove();
	handleInitialization();
	handleSideNavigation();
});