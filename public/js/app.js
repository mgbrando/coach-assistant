'use strict';

/*const Player = require('./player');
const Formation = require('./formation');
const PlayerService = require('./player-service');
const FormationService = require('./formation-service');*/

const applicationState = {
	players: {},
	formations: {},
	rosters: {},
	currentRoster: "new roster"
};

function getLayers(){
	//const layers

}
/*getFormationList(){

}
getFormationDropDownList(){

}
getRosterList(){
	let html='';


}
getRosterDropdownList(){

}*/

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

/*function getPlayerInterfaces(players, positions = [3, 4, 3]){
	let playerList = '<ul>';
	let playerDisplay = '';

	Object.keys(players).forEach(function(key){
		playerList+=getPlayersListItem(players[key]);
		playerDisplay+=getPlayerDisplayItem(players[key]);
	});
	//for(let i = 0; i < players.length; i++){
	//	playerList+=getPlayerListItem(player[i]);
	//	playerDisplay+=getPlayerDisplayItem(player[i]);
	//}
	playerList+='<ul>';

	$('.js-players-list').append(playerList);
	$('.js-team').append(playerDisplay);
}*/
function getPlayerInterfaces(players){
	getPlayersDisplay(players);
}
/*function getPlayersList(players){
	let html='<ul>';
	Object.keys(players).forEach(function(key){
		html+=`<li value="${key}">${players[key].name}</li>`;
	});
	//for(let i = 0; i < rosters.length; i++){
	//	html+=`<li value="${players[i].name}">${players[i].name}</li>`;
	//}
	html+='</ul>';
	return html;
	//$('.js-players-list').append(html);

}*/
function getPlayersListItem(player){
	return `<li value="${player.id}">${player.name}</li>`;
}
/*function getPlayersDisplayItem(player){
	let html = '';
	html+='<div class="row">'

	for(let field in player)
		html+=`<div class="col-xs-5ths">${players[field]}</div>`;
	
	html+='<div class="col-xs-5ths"><button>Update</button></div><div class="col-xs-5ths"><button type="button">Delete</button></div></div>';
	
	return html;
}*/
function getPlayersDisplay(players){
	let html = '<div class="row"><div class="col-xs-2">First Name</div><div class="col-xs-2">Last Name</div><div class="col-xs-2">Status</div><div class="col-xs-2">Preferred Position</div><div class="col-xs-2">Update</div><div class="col-xs-2">Delete</div></div>';
	Object.keys(players).forEach(function(key){
		html+=players[key].getPlayerRow();
		/*html+=`<div class="row" data-playerId="${key}">`;
		for(let field in players[key])
			html+=`<div class="col-xs-5ths">${players[key][field]}</div>`;
		html+='<div class="col-xs-5ths"><button>Update</button></div><div class="col-xs-5ths"><button type="button">Delete</button></div></div>';*/
	});
	$('.js-team').append(html);
	//html+='</div>';
}
function getFormationInterfaces(formations){
	getFormationDropDownList(formations);
	//getFormationDisplay(formations);
}

function getFormationDropDownList(formations){
	let html='';
	Object.keys(formations).forEach(function(key){
		html+=formations[key].getFormationListItemRepr();
	});
	//html+='</select>';
	console.log('FORMATION -> '+html);
	$('#js-formation-select').append(html);
}
function getFormationDisplay(formations){

}
/*function getFormationInterfaces(formations){
	let FormationList = '<ul>';
	let FormationDisplay = '<div>';
	for(let i = 0; i < players.length; i++){
		formationList+=getFormationListItem(formation[i]);
		formationDisplay+=getFormationDisplayItem(formation[i]);
	}
	formationList+='<ul>';
	formationDisplay+='</div>';	
}*/
/*function getFormationListItem(formations){
	let html='<select>';
	for(let i = 0; i < rosters.length; i++){
		html+=`<option value="${formations[i].name}">${formations[i].name}</option>`;
	}
	html+='</select>';
	$('.js-formations-list').append(html);
}
function getFormationDisplay(formations){
	let html='';
	//html+=
}*/

function getRosterInterfaces(rosters){
	getRosterDropDownList(rosters);
	//getRosterDisplay(rosters);
}
function getRosterDropDownList(rosters){
	let html='<option class="js-new-roster-option new-roster-option" value="new roster">New Roster</option>';
	Object.keys(rosters).forEach(function(key){
		html+=rosters[key].getRosterListItemRepr();
	});
	//html+='</select>';
	$('#js-roster-select').append(html);
}
function getRosterDisplay(){

}
/*function getRosterInterfaces(rosters){
	let RosterList = '<ul>';
	let RosterDisplay = '<div>';
	for(let i = 0; i < players.length; i++){
		playerList+=getPlayerListItem(player[i]);
		playerDisplay+=getPlayerDisplayItem(player[i]);
	}
	playerList+='<ul>';
	playerDisplay+='</div>';
}*/
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
function setVisualInterface(players, rosters = null){
	if(rosters){

	}
	else{
		const formationId = $('#js-formations-list').val();
		const formation = applicationState.formations[formationId];
		getVisualLayers(formation);
	}
}
/*function copyObject(obj){
	const copy = {};
	for (var attr in obj) {
    	if (obj.hasOwnProperty(attr)) 
    		copy[attr] = clone(obj[attr]);
    }
    return copy;
}*/

function setRosterName(name){
	$('.js-roster-name').text(name);
}

//create delete and update for players
function updatePlayerInterfaces(method, player){
	if(method==='create'){
		applicationState.players[player.id]=player;
		$('ul#bench').append(`<li class="js-position position">Bench</li>`);
		$('ul#bench li:not(:has(*))').first().append(`<div class="js-player-filled player-filled" data-playerId="${player.id}">${player.name}</div>`);
		let playerHtml = `<div class="row" data-playerId="${player.id}">`;
		for(let field in player){
			if(field !== 'id')
				playerHtml+=`<div class="col-xs-5ths" contenteditable="true">${player[field]}</div>`;
		}
		playerHtml+='<div class="col-xs-5ths"><button>Update</button></div><div class="col-xs-5ths"><button type="button">Delete</button></div></div>';
		$('.js-team')
			.append(playerHtml);
	}
	else if(method === 'update'){
		if((applicationState.players[player.id].firstName !== player.firstName) && 
			(applicationState.players[player.id].lastName !== player.lastName))
			$(`div[data-playerId="${player.id}"]`).text(player.name);
		applicationState.players[player.id]=player;
	}
	else{
		$(`div[data-playerId="${player.id}"]`).remove();
		$('ul#bench li:not(:has(*))').first().remove();
		delete applicationState.players[player.id];
	}
}
function getRosterOptions(){
	const rosters = applicationState.rosters;
	Object.keys(rosters).forEach(function(key){
		$('.js-roster-list').append(`<option value="${rosters[key].id}">${rosters[key].description}</option>`);
	});
}
function getFormationOptions(){
	const formations = applicationState.formations;
	Object.keys(formations).forEach(function(key){
		$('.js-formation-list').append(`<option value="${formations[key].id}">${formations[key].name}</option>`);
	});
}

function getFormationList(){
	let html = '';
	Object.keys(applicationState.formations).forEach(function(key){
		const formation = applicationState.formations[key];
		let count = 1;
		if(count === 1){
			html+='<div class="row">';
		}
		if(count % 5){
			html+='</div><div class="row">';
		}
		html+=`<div class="js-formation formation" data-formationId="${formation.id}>${formation.name}</div>`;

		count++;
	});
	return html;
}

//create and delete only for formations
function updateFormationInterfaces(method, formation){
	if(method==='create'){
		applicationState.formations[formation.id] = formation;
		if($('.js-formation-listing div.row:last-child div').length === 4){
			$('.js-formation-listing')
				.append(`<div class="row">${formation.getFormationPageHtmlRepr()}</div>`);
		}
		else{
			$('.js-formation-listing div.row:last-child')
				.append(formation.getFormationPageHtmlRepr());
		}
	}
	else{
		//$('.js-formation-listing div.)
		$(`.js-roster-select option[value="${roster.id}"]`).remove();
		$('.js-formation-listing').append(getFormationList());
		//$(`.js-formation-listing div.row`).children(`div[data-formationId="${formation.id}"]`).remove().end().		
		delete applicationState.formations[formation.id];
	}
}

//create, delete and update for rosters
function updateRosterInterfaces(method, roster){
	if(method==='create'){
		applicationState.rosters[roster.id] = roster;
		$('')
	}
	else if(method === 'update'){
		if(applicationState.rosters[roster.id].description !== roster.description)
			$(`div[data-playerId="${player.id}"]`).text(roster.description);
		applicationState.rosters[roster.id]=roster;
	}
	else{
		$(`.js-roster-select option[value="${roster.id}"]`).remove();
		delete applicationState[roster.id];
	}
}

function getVisualLayersByRoster(roster){
	console.log('THIS IS ROSTER FORMATION ID: '+roster.formationId);
	const layers = applicationState.formations[roster.formationId].layers;
	const playerPositions = roster.playerPositions;
	console.log('OMGGGG '+(applicationState.formations[roster.formationId]).layers);
	setRosterName(roster.description+' - '+applicationState.formations[roster.formationId].name);
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	for(let i = 0; i < layers.length; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}">`;
		visualHtml+=`<div class="row" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;

		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position position" data-position="${j+1}">${j+1}</li>`;
			visualHtml+=`<div class="col-xs-${columnSize}" data-position="${j+1}"></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+='</div>';
	draggableHtml+='<div><header>Bench</header><ul id="bench"></ul></div></div>';
	$('.js-player-positions').empty().append(draggableHtml);
	$('.js-main-visual').empty().append(visualHtml);
	
	const benchedPlayers = jQuery.extend(true, {}, applicationState.players);
	console.log('PLAYER POSITIONS! '+playerPositions[0].layer);
	//const benchedPlayers = copyObject(applicationState.players);
	//for(let k = 0; k <= playerPositions.length; k++) {
	  for(let k = 0; k < playerPositions.length; k++) {
		const layer = playerPositions[k].layer;
		const position = playerPositions[k].position;
		const player = applicationState.players[playerPositions[k].playerId];
		delete benchedPlayers[player.id];
		
		$(`ul#${layer} li[data-position="${k+1}"]`)
			//.empty()
			.append(`<div class="js-player-filled player-filled" data-playerId="${player.id}">${player.getFullName()}</div>`);

		$(`div[data-layer="${k+1}"] li[data-position="${position}"]`)
			//.empty()
			.append(`<div class="js-player-filled player-filled" data-playerId="${player.id}">${player.getFullName()}</div>`);
	}
	for(let n = 0; n < Object.keys(applicationState.players).length; n++){
		$('ul#bench').append(`<li class="js-position position">Bench</li>`);
		if(benchedPlayers[Object.keys(benchedPlayers)[n]])
			$(`ul#bench li:nth-child(${n+1})`).append(getPlayerItem(benchedPlayers[Object.keys(benchedPlayers)[n]]));
	}
}

function getPlayerItem(player){
	return `<div class="js-player-filled player-filled ui-widget-content" data-playerId="${player.id}">${player.getFullName()}</div>`;
}

function getVisualLayersByFormation(formation){
	const layers = formation.layers;
	setRosterName(formation.name);
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	for(let i = 0; i < layers.length; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}">`;
		visualHtml+=`<div class="row" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;

		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position position" data-position="${j+1}">${j+1}</li>`;
			visualHtml+=`<div class="col-xs-${columnSize}" data-position="${j+1}"></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+='</div>';
	draggableHtml+='<div><header>Bench</header><ul id="bench">';
	for(let j=0; j < Object.keys(applicationState.players).length; j++){
		const playerDiv = getPlayerItem(applicationState.players[Object.keys(applicationState.players)[j]]);
		draggableHtml+=`<li class="js-position position">Bench ${playerDiv}</li>`;
		//const playerDiv = getPlayerItem(applicationState.players[Object.keys(applicationState.players)[j]]);
		console.log('Line 337: '+ applicationState.formations[Object.keys(applicationState.formations)[0]].layers);//playerDiv);
		//$(`#bench li:nth-child(${j+1})`).append(playerDiv);
	}
	draggableHtml+='</ul></div></div>';
	$('.js-player-positions').empty().append(draggableHtml);
	$('.js-main-visual').empty().append(visualHtml);
	/*const layers = formation.layers;
	let draggableHtml = '';
	let visualHtml = `<header>${formation.name}</header>`;
	for(let i = 0; i <= layers.length; i++){
		draggableHtml+=`<header>Layer ${i+1}</header><ul id="${i+1}">`;
		visualHtml+='<div class="row">';
		const positions = layers[i];
		const columnSize = 12/positions;
		for(let j = 0; j <= positions; j++) { 
			draggableHtml+=`<li class="js-position position data-position="${j+1}">${j+1}</li>`;
			visualHtml+=`<div class="col-xs-${columnSize}" data-position="${j+1}"></div>`;
		}
		draggableHtml+='</ul>';
		visualHtml+='</div>';
	}
	draggableHtml+='<header>Bench</header>';
	draggableHtml+=getPlayersList(applicationState.players);
	$('.js-draggable').empty().html(draggableHtml);
	$('.js-main-visual').empty().html(visualHtml);*/
}

function getDraggableInterface(){

}

function getMainVisual(){

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
					player = new Player(player);
					applicationState.players[player.id] = player;
					//$('.js-team').append(player.getHtmlRepr());
				});
			}
			else{
				console.log(players.length);
				for(let i = 0; i < players.length; i++){
					console.log('I AM IN HERE!');
					console.log(players[i]);
					//ask if there is a performance issue declaring this inside the loop instead of outside with let
					const player = new Player(players[i]);
					applicationState.players[player.id] = player;
					//$('.js-team').append(player.getHtmlRepr());
				}
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
						formation = new Formation(formation);
						applicationState.formations[formation.id] = formation;
						//$('.js-formation-listing').append(formation.getHtmlRepr(formation.id));
					});
				}
				else{
					for(let i = 0; i < formations.length; i++){
						//ask if there is a performance issue declaring this inside the loop instead of outside with let
						const formation = new Formation(formations[i]);
						applicationState.formations[formation.id] = formation;
						console.log('THIS IS HTML: '+formation.getHtmlRepr(i));
						//$('.js-formation-listing').append(formation.getHtmlRepr(formation.id));
						//updateFormationInterfaces('create', formation);
					}
				//$('select').material_select();
				resolve('OK');
				}
			});
		});
	})
	.then(() => {
		console.log('RAWR!!!!!!');
		return new Promise((resolve, reject) => {
			const getRostersPromise = RosterService.getRosters();
			getRostersPromise.done(function(results){
				const rosters = results.rosters;
				if(rosters.length === 0){
					//console.log(applicationState.players[0].id);
					//console.log(applicationState.formations[0].id);
					const playerId = applicationState.players[Object.keys(applicationState.players)[0]].id;//PlayerService.getPlayers()[0].id;
					const formationId = applicationState.formations[Object.keys(applicationState.formations)[0]].id; //FormationService.getFormations()[0].id;
					const addRosterPromise = RosterService.addRoster({formationId: formationId, playerPositions: [{layer: 1, position: 3, playerId: playerId}], 
								description: "Roster for against the Raptors", notes: "The Raptors are the best team in the league."});
				
					addRosterPromise.done(function(roster){
						roster = new Roster(roster);
						applicationState.rosters[roster.id] = roster;
						//$('.js-rosters').append(roster.getHtmlRepr());
					});
				}
				else{
				//getRostersList(rosters);
					for(let i = 0; i < rosters.length; i++){
						//ask if there is a performance issue declaring this inside the loop instead of outside with let
						const roster = new Roster(rosters[i]);
						applicationState.rosters[roster.id] = roster;
						console.log(applicationState.rosters[roster.id]);
						//$('.js-rosters').append(roster.getHtmlRepr());
					}
				console.log(applicationState);
				resolve('OK');
				}
			});
		});
	})
	.then(() => {
		console.log(Object.keys(applicationState.formations));
		console.log('FORMATION! '+applicationState.formations[Object.keys(applicationState.formations)[0]]);
		getVisualLayersByFormation(applicationState.formations[Object.keys(applicationState.formations)[0]]);
		getRosterInterfaces(applicationState.rosters);
		getFormationInterfaces(applicationState.formations);
		getPlayerInterfaces(applicationState.players);
	});
	/*A check for last roster or formation that  was up is need here to determine whether
	to show a roster with everything places correctly or a formation with everyone on the
	bench or possibly in the positions they were last in.
	if()*/
	//if(applicationState.currentRoster === "new roster")
	/*getPlayerInterfaces(applicationState.players);
	console.log();
	getPlayerInterfaces(applicationState.players, applicationState.rosters[Object.keys(applicationState.rosters)[0]].playerPositions); //, applicationState.formations[Object.keys(applicationState.formations)[0]]);
	getFormationInterfaces(applicationState.formations);
	getRosterInterfaces(applicationState.rosters);
	setDraggableInterface(applicationState.players);*/
}
function handleRosterSelectionChanges(){
	$('#js-roster-select').on('change', function(){
		//console.log('VALUEEEEEEE: '+this.value);
		if((this.value) === "new roster"){
			$('.js-formation-select-container').removeClass('hidden');
			getVisualLayersByFormation(applicationState.formations[$('#js-formation-select').val()]);
		}
		else{
			$('.js-formation-select-container').addClass('hidden');
			getVisualLayersByRoster(applicationState.rosters[$('#js-roster-select').val()]);
		}
	});
	$('#js-formation-select').on('change', function(){
		getVisualLayersByFormation(applicationState.formations[$('#js-formation-select').val()]);
	});
}
function handleInitialization2(){
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
					player = new Player(player);
					applicationState.players[player.id] = player;
					$('.js-team').append(player.getHtmlRepr());
				});
			}
			else{
				console.log(players.length);
				for(let i = 0; i < players.length; i++){
					console.log('I AM IN HERE!');
					console.log(players[i]);
					//ask if there is a performance issue declaring this inside the loop instead of outside with let
					const player = new Player(players[i]);
					applicationState.players[player.id] = player;
					$('.js-team').append(player.getHtmlRepr());
				}
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
						formation = new Formation(formation);
						applicationState.formations[formation.id] = formation;
						$('.js-formation-listing').append(formation.getHtmlRepr(formation.id));
					});
				}
				else{
					for(let i = 0; i < formations.length; i++){
						//ask if there is a performance issue declaring this inside the loop instead of outside with let
						const formation = new Formation(formations[i]);
						applicationState.formations[formation.id] = formation;
						console.log('THIS IS HTML: '+formation.getHtmlRepr(i));
						$('.js-formation-listing').append(formation.getHtmlRepr(formation.id));
					}
				//$('select').material_select();
				resolve('OK');
				}
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
				const addRosterPromise = RosterService.addRoster({formationId: formationId, playerPositions: [{layer: 1, position: 3, playerId: playerId}], 
								description: "Roster for against the Raptors", notes: "The Raptors are the best team in the league."});
				
				addRosterPromise.done(function(roster){
					roster = new Roster(roster);
					applicationState.rosters[roster.id] = roster;
					$('.js-rosters').append(roster.getHtmlRepr());
				});
			}
			else{
			//getRostersList(rosters);
				for(let i = 0; i < rosters.length; i++){
					//ask if there is a performance issue declaring this inside the loop instead of outside with let
					const roster = new Roster(rosters[i]);
					applicationState.rosters[roster.id] = roster;
					$('.js-rosters').append(roster.getHtmlRepr());
				}
				console.log(applicationState);
			}
		});
	});
	/*A check for last roster or formation that  was up is need here to determine whether
	to show a roster with everything places correctly or a formation with everyone on the
	bench or possibly in the positions they were last in.
	if()*/
	//if(applicationState.currentRoster === "new roster")
	//getPlayerInterfaces(applicationState.players);
	getPlayerInterfaces(applicationState.players, applicationState.rosters[0].playerPositions); //, applicationState.formations[Object.keys(applicationState.formations)[0]]);
	getFormationInterfaces(applicationState.formations);
	getRosterInterfaces(applicationState.rosters);
	setDraggableInterface(applicationState.players);
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
			formationId: rosterObject.formationId,
			playerPositions: rosterObject.playerPositions,
			description: $('.js-roster-description').val(),
			notes: $('.js-roster-notes').val()
		};
		RosterService.addRoster({});
	});
}

/*function revealCurrentPage(pageElement){
	
}*/
function handleDraggable(){
	$(function() {
		$('.js-player-filled').draggable();
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
	$('.js-nav-button').click(function(){
		if($(this).hasClass('selected-nav')){
		}
		else{
			$('.js-nav-button').removeClass('selected-nav');
			$(this).addClass('selected-nav');
			switch($(this).text()){
				case "Home":
					$('.js-visual-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					break;
				case "Rosters":
					$('.js-roster-section').removeClass('hidden');
					$('.js-visual-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					break;
				case "Formations":
					$('.js-formations-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-visual-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					break;
				case "Team":
					$('.js-team-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-visual-section').addClass('hidden');
					break;
				default:
					break;
			}
		}
	});
	//On drop for drag and drop functionality
}

$(document).ready(function(){
	//$('no-js-warning').remove();
	handleInitialization();
	//handleMainScreenEvents();
	handleSideNavigation();
	handleRosterSelectionChanges();
	handleDraggable();
	//handlePlayerScreenEvents();
	//handleFormationScreenEvents();
	//handleRosterScreenEvents();
});