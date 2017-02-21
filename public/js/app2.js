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
getFormationList(){

}
getFormationDropDownList(){

}
getRosterList(){
	let html='';


}
getRosterDropdownList(){

}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function getPlayerInterfaces(players){
	let playerList = '<ul>';
	let playerDisplay = '<div>';
	for(let i = 0; i < players.length; i++){
		playerList+=getPlayerListItem(player[i]);
		playerDisplay+=getPlayerDisplayItem(player[i]);
	}
	playerList+='<ul>';
	playerDisplay+='</div>';
}
function getPlayersList(players){
	let html='<ul>';
	for(let i = 0; i < rosters.length; i++){
		html+=`<li value="${players[i].name}">${players[i].name}</li>`;
	}
	html+='</ul';
	$('.js-players-list').append(html);

}
function getPlayersDisplay(players){
	const htmlRepr = PlayerService.
}
function getFormationInterfaces(formations){
	let FormationList = '<ul>';
	let FormationDisplay = '<div>';
	for(let i = 0; i < players.length; i++){
		formationList+=getFormationListItem(formation[i]);
		formationDisplay+=getFormationDisplayItem(formation[i]);
	}
	formationList+='<ul>';
	formationDisplay+='</div>';	
}
function getFormationListItem(formations){
	let html='<select>';
	for(let i = 0; i < rosters.length; i++){
		html+=`<option value="${formations[i].name}">${formations[i].name}</option>`;
	}
	html+='</select>';
	$('.js-formations-list').append(html);
}
function getFormationDisplay(formations){
	let html='';
	html+=
}
function getRosterInterfaces(rosters){
	let RosterList = '<ul>';
	let RosterDisplay = '<div>';
	for(let i = 0; i < players.length; i++){
		playerList+=getPlayerListItem(player[i]);
		playerDisplay+=getPlayerDisplayItem(player[i]);
	}
	playerList+='<ul>';
	playerDisplay+='</div>';
}
function getRosterListItem(rosters){
	let html='<select>';
	for(let i = 0; i < rosters.length; i++){
		html+=`<option value="${rosters[i].name}">${rosters[i].name}</option>`;
	}
	html+='</select>';
	$('.js-rosters-list').append(html);
}
function getRosterDisplay(rosters){
	let html='';
}


function handleInitialization(){
	console.log('HELLO!');
	const getPlayersPromise = PlayerService.getPlayers();
	//console.log(players.length);
	getPlayersPromise.done(function(results){
		const players = results.players;
		return new Promise((resolve, reject ) => {
			console.log(players);
			console.log('INSIDE THIS FUNCTION!');
			if(players.length === 0){
				console.log('INSIDE THIS FUNCTION!');
				const addPlayerPromise = PlayerService.addPlayer({firstName: "John", lastName: "Doe", 
				status: "active", preferredPosition: "Goalie"});

				addPlayerPromise.done(function(player){
					applicationState.players.push(player);
				});
			}
			console.log(players.length);
			for(let i = 0; i < players.length; i++){
				console.log('I AM IN HERE!');
				console.log(players[i]);
				//ask if there is a performance issue declaring this inside the loop instead of outside with let
				const player = new Player(players[i]);
				applicationState.players.push(player);
				$('.js-team').append(player.getHtmlRepr());
			}
			//getInitialFormations();
			console.log(applicationState);
			resolve('OK');
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			const getFormationsPromise = FormationService.getFormations();
			getFormationsPromise.done(function(results){
				const formations = results.formations;
				if(formations.length === 0){
					const addFormationPromise = FormationService.addFormation({layers: [3, 4, 3]});
					addFormationPromise.done(function(formation){
						applicationState.formations.push(formation);
					});
				}

				for(let i = 0; i < formations.length; i++){
					//ask if there is a performance issue declaring this inside the loop instead of outside with let
					const formation = new Formation(formations[i]);

					applicationState.formations.push(formation);
					console.log('THIS IS HTML: '+formation.getHtmlRepr(i));
					$('.js-formation-listing').append(formation.getHtmlRepr(i));
				}
				//$('select').material_select();
				resolve('OK');
			});
		});
	})
	.then(() => {
		console.log('RAWR!!!!!!');
		const getRostersPromise = RosterService.getRosters();
		getRostersPromise.done(function(results){
			const rosters = results.rosters;
			if(rosters.length === 0){
				console.log(applicationState.players[0].id);
				console.log(applicationState.formations[0].id);
				const playerId = applicationState.players[0].id;//PlayerService.getPlayers()[0].id;
				const formationId = applicationState.formations[0].id; //FormationService.getFormations()[0].id;
				RosterService.addRoster({formationId: formationId, playerPositions: [{layer: 1, position: 3, playerId: playerId}], 
								description: "Roster for against the Raptors", notes: "The Raptors are the best team in the league."});
			}
			getRostersList(rosters);
			for(let i = 0; i < rosters.length; i++){
				//ask if there is a performance issue declaring this inside the loop instead of outside with let
				const roster = new Roster(rosters[i]);
				applicationState.rosters.push(roster);
				$('.js-rosters').append(roster.getHtmlRepr());
			}
			console.log(applicationState);
		});
	});
}

function handleMainScreenEvents(){
	$('#js-type-select').change(function(){ 
    	if(this.val() === formations){
    		getFormationList();
    	}
    	else{
    		getRosterList();
    	}
	});

	$('#js-visual-select').change(function(){ 
		changeVisual(this.val());
	});

	$('.js-save-roster').click(function(){
		const roster = {
			formationId: rosterObject.formationId;
			playerPositions: rosterObject.playerPositions;
			description = $('.js-roster-description').val();
			notes = $('.js-roster-notes').val();
		}
		RosterService.addRoster({});
	});
}

function handleSideNavigation(){
	//$(".button-collapse").sideNav();
	//getLayers();
	$('.side-nav').on('click', '.js-nav-option', function(){
		const screen = this.text;
		if($(this).hasClass('hidden')){
			$('.js-nav-option').removeClass('hidden').addClass('hidden');
			$(this).removeClass('hidden');
		}
		/*switch(screen){
			case 'Home':
				$('.js-nav-home nav-home').removeClass('hidden');
				$('.js-nav-home nav-home').removeClass('hidden');
		}*/
	});

	//On drop for drag and drop functionality
}

$(document).ready(function(){
	//$('no-js-warning').remove();
	handleInitialization();
	handleMainScreenEvents();
	handleSideNavigation();
	handlePlayerScreenEvents();
	handleFormationScreenEvents();
	handleRosterScreenEvents();
});