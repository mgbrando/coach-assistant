'use strict';

/*const Player = require('./player');
const Formation = require('./formation');
const PlayerService = require('./player-service');
const FormationService = require('./formation-service');*/

const applicationState = {
	players: {},
	formations: {},
	rosters: {},
	currentRosterId: "",
	currentFormationId: "",
	startPosition: {}
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
    $('.js-closed-nav').addClass('hidden');
    $('.js-nav-components').removeClass('hidden');
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "50px";
    document.getElementById("main").style.marginLeft = "50px";
    $('.js-closed-nav').removeClass('hidden');
    $('.js-nav-components').addClass('hidden');
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
	let html ='<table class="table table-striped">';
	html += '<thead class="playerlist-header"><tr><th class="">First Name</th><th class="">Last Name</th><th class="">Status</th><th class="">Preferred Position</th><th class="">Update</th><th class="">Delete</th></tr></thead><tbody>';
	Object.keys(players).forEach(function(key){
		html+=players[key].getPlayerRow();
	});
	html+='</tbody></table>';
	$('.js-team').append(html);
}
/*function getPlayersDisplay(players){
	let html = '<div class="row playerlist-header"><div class="col-xs-2">First Name</div><div class="col-xs-2">Last Name</div><div class="col-xs-2">Status</div><div class="col-xs-2">Preferred Position</div><div class="col-xs-2">Update</div><div class="col-xs-2">Delete</div></div>';
	Object.keys(players).forEach(function(key){
		html+=players[key].getPlayerRow();
	});
	$('.js-team').append(html);
}*/
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
	$('#js-formation-list').append(html);
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
	let html='<li class="js-roster-list-item roster-item" data-value="new roster"><a class="js-nav-button nav-button" href="#">New Roster</a></li>';
	html+='<li class="divider"></li>';
	Object.keys(rosters).forEach(function(key){
		html+=rosters[key].getRosterListItemRepr();
	});
	//html+='</select>';
	$('#js-roster-list').append(html);
}
/*function getRosterDisplay(){

}*/
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
function getRostersDisplay(rosters){
	let html ='<table class="table table-striped">';
	html += `<thead class="rosterlist-header">
				<tr>
					<th class="">Description</th>
					<th class="">Date Created</th>
					<th class="">Last Modified</th>
					<th class="">Notes</th>
					<th class="">Update</th>
					<th class="">Delete</th>
				</tr>
			</thead>
			<tbody>`;
	Object.keys(rosters).forEach(function(key){
		html+=rosters[key].getRosterRow();
	});
	html+='</tbody></table>';
	$('.js-rosters').append(html);
}
function getRosterList(){
	let html = '';
	let count = 1;
	let rows=0;
	Object.keys(applicationState.rosters).forEach(function(key){
		const roster = applicationState.rosters[key];
		if(count === 1){
			html+='<div class="row">';
			//rows++;
		}
		if((count % 3)===0){
			html+='</div><div class="row">';
			//rows++;
			count++;
		}
		//row-xs-${(Object.keys(applicationState.formations).length)/4}
		html+=`<div class="col-xs-6">
				<div class="js-roster roster" data-rosterId="${roster.id}">
					<header>${roster.description}</header>
					<div><span>Date Created:</span></div>
					<div><span>Last Modified:</span></div>
				</div>
			</div>`;
		count++;
	});
	return html+'</div>';
}
function getRosterListItem(rosters){
	let html='<select>';
	for(let i = 0; i < rosters.length; i++){
		html+=`<option value="${rosters[i].name}">${rosters[i].name}</option>`;
	}
	html+='</select>';
	$('.js-rosters-list').append(html);
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
	//console.log('METHOD: '+method);
	if(method==='create'){
		applicationState.players[player.id]=player;
		$('ul#12').append(`<li class="js-position position">Bench</li>`);
		$('ul#12 li:not(:has(*))').first().append(`<div class="js-player-filled player-filled" data-playerId="${player.id}">${player.name}</div>`);
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
		console.log('IN UPDATE');
		//if((applicationState.players[player.id].firstName !== player.firstName) && 
		//	(applicationState.players[player.id].lastName !== player.lastName)){
			$(`div.player-filled[data-playerId="${player.id}"]`).text(player.getFullName());
		//}
		applicationState.players[player.id]=player;
		console.log('PAST IF');
	}
	else{
		$(`tr.player-entry[data-playerId="${player.id}"]`).remove();
		$(`div[data-playerId="${player.id}"]`).remove();
		$('ul#12 li:not(:has(*))').first().remove();
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
	let count = 1;
	let rows=0;
	Object.keys(applicationState.formations).forEach(function(key){
		const formation = applicationState.formations[key];
		console.log(`MODULUS count: `+ (count % 4));
		if(count === 1){
			html+='<div class="row">';
			//rows++;
		}
		if((count % 4)===0){
			html+='</div><div class="row">';
			//rows++;
			count++;
		}
		//row-xs-${(Object.keys(applicationState.formations).length)/4}
		html+=`<div class="col-xs-4 formation-container"><div class="noselect js-formation formation ui-widget-content" data-formationId="${formation.id}">${formation.name}</div></div>`;
		count++;
	});
	return html+'</div>';
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
		$(`#js-formation-list li[data-value="${formation.id}"]`).remove();

		//NEEDED
		//$('.js-formation-listing').append(getFormationList());
		//$(`.js-formation-listing div.row`).children(`div[data-formationId="${formation.id}"]`).remove().end().		
		delete applicationState.formations[formation.id];
	}
}

//create, delete and update for rosters
function updateRosterInterfaces(method, roster){
	if(method==='create'){
		applicationState.rosters[roster.id] = roster;
		$('#js-roster-list').append(roster.getRosterListItemRepr());
		$('#js-roster-list li:last-child').trigger('click');
		$('.js-rosters table tbody').append(roster.getRosterRow());
	}
	else if(method === 'update'){
		/*if(applicationState.rosters[roster.id].description !== roster.description)
			$(`div[data-playerId="${player.id}"]`).text(roster.description);*/
		/*for(field in roster){
			console.log('FIELD IN ROSTER: '+ roster);
		}*/
		applicationState.rosters[roster.id]=new Roster(roster);
		$('.roster-button-text').text(roster.description);
		$(`.js-roster-list-item[data-value="${roster.id}"] a`).text(roster.description);
		$(`tr.roster-entry[data-rosterId="${roster.id}"] td`).each(function(){
			const dataType = $(this).attr('data-type');
			if(dataType !== "dateCreated"){
				console.log('DATATYPE: '+dataType);
				$(this).text(roster[dataType]);
			}
		});
		//$('.js-rosters table tbody').append(roster.getRosterRow());
	}
	else{
		$(`tr.roster-entry[data-rosterId="${roster.id}"]`).remove();
		$(`#js-roster-list li[data-value="${roster.id}"]`).remove();
		delete applicationState[roster.id];
	}
}

function getVisualLayersByRoster(roster){
	console.log('THIS IS ROSTER FORMATION ID: '+roster.formationId);
	const layers = applicationState.formations[roster.formationId].layers;
	const layersLength=layers.length;
	const playerPositions = roster.playerPositions;
	console.log('OMGGGG '+(applicationState.formations[roster.formationId]).layers);
	//setRosterName(roster.description+' - '+applicationState.formations[roster.formationId].name);
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	for(let i = 0; i < layersLength; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}">`;
		visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;
		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position ui-widget-content position ui-widget-header" data-position="${j+1}">${j+1}</li>`;
			visualHtml+=`<div class="col-xs-${columnSize} visual-position-container" data-position="${j+1}"><div class="visual-position ui-widget-header">${j+1}</div></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="11">
				<div class="col-xs-12 visual-position-container ui-widget-header" data-position="1"><div class="visual-position ui-widget-header">Goalie</div></div>
				</div></div>`;
	draggableHtml+='<div><header>Goalie</header><ul id="11"><li class="js-position position ui-widget-header" data-position="1">Goalie</li></ul></div>';
	draggableHtml+='<div><header>Bench</header><ul id="12">';
	for(let n = 0; n < Object.keys(applicationState.players).length; n++){
		draggableHtml+=`<li class="js-position position ui-widget-header" data-position="${n+1}">Bench</li>`;
	}
	draggableHtml+='</ul></div></div>'

	$('.js-player-positions').empty().append(draggableHtml);
	$('.js-main-visual').empty().append(visualHtml);
	
	//const benchedPlayers = jQuery.extend(true, {}, applicationState.players);
	//console.log('PLAYER POSITIONS! '+playerPositions[0].layer);
	//const benchedPlayers = copyObject(applicationState.players);
	//for(let k = 0; k <= playerPositions.length; k++) {
	  for(let k = 0; k < playerPositions.length; k++) {
		const layer = playerPositions[k].layer;
		const position = playerPositions[k].position;
		const player = applicationState.players[playerPositions[k].playerId];
		//delete benchedPlayers[player.id];
		
		$(`ul#${layer} li[data-position="${k+1}"]`)
			//.empty()
			.append(player.getPlayerDraggableDiv());

		$(`div[data-layer="${k+1}"] li[data-position="${position}"]`)
			//.empty()
			.append(player.getPlayerDraggableDiv());
	}
	/*for(let n = 0; n < Object.keys(applicationState.players).length; n++){
		$('ul#12').append(`<li class="js-position position ui-widget-header" data-position="${n+1}">Bench</li>`);
		if(benchedPlayers[Object.keys(benchedPlayers)[n]])
			$(`ul#12 li:nth-child(${n+1})`).append(getPlayerItem(benchedPlayers[Object.keys(benchedPlayers)[n]]));
	}*/

	handleDraggable();
}

function getPlayerItem(player){
	return `<div class="js-player-filled player-filled ui-widget-content" data-playerId="${player.id}">${player.getFullName()}</div>`;
}

function getVisualLayersByFormation(formation){
	const layers = formation.layers;
	//setRosterName(formation.name);
	const layersLength=layers.length;
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	for(let i = 0; i < layersLength; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}">`;
		visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;
		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position position ui-widget-header" data-position="${j+1}">${j+1}</li>`;
			visualHtml+=`<div class="col-xs-${columnSize} visual-position-container" data-position="${j+1}"><div class="visual-position ui-widget-header">${j+1}</div></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="11">
				<div class="col-xs-12 visual-position-container" data-position="1"><div class="visual-position ui-widget-header">Goalie</div></div>
				</div></div>`;
	draggableHtml+='<div><header>Goalie</header><ul id="11"><li class="js-position position ui-widget-header" data-position="1">Goalie</li></ul></div>';
	draggableHtml+='<div><header>Bench</header><ul id="12">';
	for(let k=0; k < Object.keys(applicationState.players).length; k++){
		const playerDiv = getPlayerItem(applicationState.players[Object.keys(applicationState.players)[k]]);
		draggableHtml+=`<li class="js-position position ui-widget-header" data-position="${k+1}">Bench ${playerDiv}</li>`;
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
	handleDraggable();
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
					let playerPositions = [];
					let count=1;
					Object.keys(applicationState.players).forEach(function(key){
						if(count===1){
							playerPositions.push({layer: 11, position: 1, playerId: key});
						}
						else if(count===2){
							playerPositions.push({layer: 2, position: 2, playerId: key});
						}
						else{
							playerPositions.push({layer: 12, position: count, playerId: key});
						}
						count++;
						console.log("PP: "+playerPositions[count-1]);
					});
					const playerId = applicationState.players[Object.keys(applicationState.players)[0]].id;//PlayerService.getPlayers()[0].id;
					const formationId = applicationState.formations[Object.keys(applicationState.formations)[0]].id; //FormationService.getFormations()[0].id;
					const addRosterPromise = RosterService.addRoster({formationId: formationId, playerPositions: playerPositions, 
								description: "Roster for against the Raptors", notes: "The Raptors are the best team in the league."});
				
					addRosterPromise.done(function(roster){
						roster = new Roster(roster);
						applicationState.rosters[roster.id] = roster;
						//$('.js-rosters').append(roster.getHtmlRepr());
						for(field in applicationState[roster.id]){
							console.log(field);
						}
					});
					resolve('OK');
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
		getRostersDisplay(applicationState.rosters);
		//$('.js-rosters').append(getRosterDisplay());
		$('.js-formation-listing').append(getFormationList());
		handleSideNavigation();
		handleFieldOperations();
		handlePlayerOperations();
		handleRosterOperations();
		handleFormationOperations();
		handleDraggable();
  		/*setHeight();
  	
  		$(window).resize(function() {
    		setHeight();
  		});*/
		/*for(field in applicationState.rosters[Object.keys(applicationState.rosters)[0]]){
			console.log(field);
		}*/
  		console.log('CURRENTROSTERID: '+applicationState.currentRosterId+' CURRENTFORMATIONID: '+applicationState.currentFormationId);
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

/*function setHeight(element) {
    windowHeight = $(window).innerHeight();
    $(element).css('min-height', windowHeight);
};*/
/*function getCombinedId(){
	const rosterId = applicationState.rosters[Object.keys(applicationState.rosters)[0]];
	const formationId = applicationState.formations[Object.keys(applicationState.formations)[0]];
	return rosterId+formationId;
}*/

function changeDropDownListView(type, id){
	if(type === 'roster'){
		$(`#js-roster-list li[data-value="${applicationState.currentRosterId}"]`).removeClass('hidden');
		$(`#js-roster-list li[data-value="${id}"]`).addClass('hidden');
		if(id === 'new roster')
			$('.roster-button-text').text('New Roster');
		else	
			$('.roster-button-text').text(applicationState.rosters[id].description);
	}
	else{
		$(`#js-formation-list li[data-value="${applicationState.currentFormationId}"]`).removeClass('hidden');
		$(`#js-formation-list li[data-value="${id}"]`).addClass('hidden');
		$('.formation-button-text').text(applicationState.formations[id].name);
	}
}
function getPlayerPositions(){
	const players = applicationState.players;
	let playerPositions = [];
	$('.js-player-filled').each(function(){
		const layer = parseInt($(this).closest('ul').attr('id'));
		//if(layer != '12'){
			const position = parseInt($(this).parent().attr('data-position'));
			const playerId = $(this).attr('data-playerId');
			playerPositions.push({layer: layer, position: position, playerId: playerId});
		//}
	});
	/*Object.keys(players).forEach(function(key){
		temp$()
		playerPositions.push();
	});*/
	console.log(playerPositions[0]);
	return playerPositions;
}

/*Field Operations*/
function handleFieldOperations(){
	applicationState.currentRosterId = "new player";
	applicationState.currentFormationId = Object.keys(applicationState.formations)[0];

	$('#js-roster-list').on('click', 'li', function(){
		//console.log('VALUEEEEEEE: '+this.value);
		const rosterId = $(this).attr('data-value');
		console.log('ROSTERID 1: '+rosterId);
		if(rosterId === applicationState.currentRosterId){
			return;
		}
		console.log('MADE IT!');
		console.log('DATA VALUE!!! '+$(this).attr('data-value'));
		if(rosterId === "new roster"){
			console.log('ROSTERID 2: '+rosterId);
			$('.js-update-roster-button').addClass('hidden');
			$('.js-notes-button').addClass('hidden');
			$('.js-formation-list-container').removeClass('hidden');
			$('.js-save-button').removeClass('hidden');
			//$(`#js-formation-list li[data-value="rosterId"]`).addClass('hidden');
			//$(`#js-roster-list li[data-value="${rosterId}"]`).addClass();
			changeDropDownListView('roster', rosterId);
			console.log('FORMATIONID: '+applicationState.currentFormationId);
			getVisualLayersByFormation(applicationState.formations[applicationState.currentFormationId]);
			applicationState.currentRosterId = rosterId;
		}
		else{
			$('.js-formation-list-container').addClass('hidden');
			$('.js-save-button').addClass('hidden');
			$('.js-update-roster-button').removeClass('hidden');
			$('.js-notes-button').removeClass('hidden');
			$('#js-update-description').val(applicationState.rosters[rosterId].description);
			$('#js-update-notes').val(applicationState.rosters[rosterId].notes);
			changeDropDownListView('roster', rosterId);
			getVisualLayersByRoster(applicationState.rosters[rosterId]);
			applicationState.currentRosterId = rosterId;
		}
	});
	$('#js-formation-list').on('click', 'li', function(){
		const formationId = $(this).attr('data-value');
		if(formationId === applicationState.currentFormationId){
			return;
		}
		changeDropDownListView('formation', formationId);
		getVisualLayersByFormation(applicationState.formations[formationId]);
		applicationState.currentFormationId = formationId;
	});

	$('.js-save-roster-button').click(function(){
		const roster = {
    			formationId: applicationState.currentFormationId,
    			playerPositions: getPlayerPositions(),
    			description: $('#description').val(),
    			notes: $('#notes').val()
		};
		const addRosterPromise = RosterService.addRoster(roster);
		addRosterPromise.done(function(rosterObject){
			rosterObject = new Roster(rosterObject);
			updateRosterInterfaces('create', rosterObject);
			$('.js-roster-list li[data-value="${rosterObject.id}"]').trigger('click');
		});		
		$('#description').val('');
		$('#notes').val('');
	});

	$('.js-update-roster-button').click(function(){
		const roster = {
			id: applicationState.currentRosterId,
    		formationId: applicationState.rosters[applicationState.currentRosterId].formationId,
    		playerPositions: getPlayerPositions(),
    		lastModified: new Date().toDateString(),
    		description: $('#js-update-description').val(),
    		notes: $('#js-update-notes').val()
		};
		const updateRosterPromise = RosterService.updateRoster(roster);
		updateRosterPromise.done(function(){
			updateRosterInterfaces('update', roster);
		});
	});
}

function handleRosterOperations(){
	$('.js-roster-row-update-button').click(function(){
		const rosterId = $(this).closest('tr').attr('data-rosterId');
		const oldRoster = applicationState.rosters[rosterId].getRosterObject();
		console.log(oldRoster.description);
		let newRoster = {id: rosterId};
		console.log('NEW ROSTER: '+newRoster);
		let count = 0;
		$(this).parent().siblings().each(function(){
			console.log(count);
			if(count < 4){
				newRoster[$(this).attr('data-type')] = $(this).text();
			}
			//console.log('HIYA!: '+$(this).text());
			count++;
		});
		/*for(let field in newPlayer){
			console.log('OLDPLAYER: '+oldPlayer[field]);
			console.log('NEWPLAYER: '+newPlayer[field]);

		}
		console.log(objectsAreEqual(oldPlayer, newPlayer));*/
		if(!objectsAreEqual(oldRoster, newRoster)){
			const updateRosterPromise = RosterService.updateRoster(newRoster);
			updateRosterPromise.done(function(){
				//applicationState.players[playerId] = new Player(newPlayer);
				updateRosterInterfaces('update', newRoster);
			});
		}
	});

	$('.js-roster-row-delete-button').click(function(){
		const rosterId = $(this).closest('tr').attr('data-rosterId');
		const roster = applicationState.rosters[rosterId];
		if(confirm(`Permanently delete Roster: ${applicationState.rosters[rosterId].description}?`)){
			const deleteRosterPromise = RosterService.deleteRoster(rosterId);
			deleteRosterPromise.done(function(){
				updateRosterInterfaces('delete', roster);
			});
		}
	});
}

function handleFormationOperations(){
	$('.js-formation-listing').bind( "mousedown", function (e){
    	e.metaKey = true;
	}).selectable({filter: ".js-formation"});
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
function handlePlayerOperations(){
	$('.js-update-button').click(function(){
		const playerId = $(this).closest('tr').attr('data-playerId');
		const oldPlayer = applicationState.players[playerId].getPlayerObject();
		console.log(oldPlayer.status);
		let newPlayer = {id: playerId};
		console.log('NEW PLAYER: '+newPlayer);
		let count = 0;
		$(this).parent().siblings().each(function(){
			console.log(count);
			if(count < 4){
				newPlayer[$(this).attr('data-type')] = $(this).text();
			}
			//console.log('HIYA!: '+$(this).text());
			count++;
		});
		/*for(let field in newPlayer){
			console.log('OLDPLAYER: '+oldPlayer[field]);
			console.log('NEWPLAYER: '+newPlayer[field]);

		}
		console.log(objectsAreEqual(oldPlayer, newPlayer));*/
		if(!objectsAreEqual(oldPlayer, newPlayer)){
			const updatePlayerPromise = PlayerService.updatePlayer(newPlayer);
			updatePlayerPromise.done(function(){
				//applicationState.players[playerId] = new Player(newPlayer);
				updatePlayerInterfaces('update', new Player(newPlayer));
			});
		}
	});

	$('.js-delete-button').click(function(){
		const playerId = $(this).closest('tr').attr('data-playerId');
		const player = applicationState.players[playerId];
		if(confirm(`Permanently delete Player: ${applicationState.players[playerId].getFullName()}?`)){
			const deletePlayerPromise = PlayerService.deletePlayer(playerId);
			deletePlayerPromise.done(function(){
				updatePlayerInterfaces('delete', player);
			});
		}
	});
}
function objectsAreEqual(object1, object2){
	if(typeof object1 === 'object' && typeof object2 === 'object'){
		if(Object.keys(object1).length === Object.keys(object2).length){
			for(let field in object1){
				if(object1[field].trim() !== object2[field].trim())
					return false;
			}
			return true;
		}
		return false;
	}
	return false;
}
/*function revealCurrentPage(pageElement){
	
}*/
function handleDraggable(){
	//$(function() {

	/*$(myDroppable).droppable({
    	drop:function(event, ui) {
        	ui.draggable.detach().appendTo($(this));
    	}
	});*/

	$('.js-player-filled').draggable({
		revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        },
		create: function(ev, ui){
			const layer = $(this).closest('ul').attr('id');
			const position = $(this).parent().addClass('slot-filled').attr('data-position');
			console.log('LAYER: '+layer+' POSITION: '+position)
			if(layer !== '12'){
				$(`.row[data-layer="${layer}"] div[data-position="${position}"]`).text($(this).text());
			}
		},
		stop: function(ev, ui){

		},
		axis: 'y',
		containment: '.js-player-positions > div'
		/*snap: '.js-position',
		snapMode: 'inner'*/
	});
	//});

	$('.position').droppable({
    	drop: function(ev, ui) {
    		const oldLayer = $(ui.draggable).closest('ul').attr('id');
    		const oldPosition = $(ui.draggable).parent().removeClass('slot-filled').attr('data-position');
    		if($(this).children().length !== 0){
    			$(this).children('.player-filled').detach().css({top: 0, left: 0}).appendTo(`ul[id="${oldLayer}"] li[data-position="${oldPosition}"]`);
    		}
        	$(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
        	const layer = $(ui.draggable).closest('ul').attr('id');
        	const position = $(ui.draggable).parent().addClass('slot-filled').attr('data-position');
        	console.log('LP: '+layer + position);
        	$(`.row[data-layer="${oldLayer}"] div[data-position="${oldPosition}"] div.visual-position`).text(''+oldPosition);
        	if(layer != '12')
        		$(`.row[data-layer="${layer}"] div[data-position="${position}"] div.visual-position`).text($(ui.draggable).text());
        	//$('.visual-position').text($(ui.draggable).text());
    	}
	});

	//$('.position').selectable();
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
				case "Field":
					$('.js-visual-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					$('.nav-button-text').text('Field');
					$('.js-nav-list-item').removeClass('hidden');
					$('.js-field-item').addClass('hidden');
					break;
				case "Rosters":
					$('.js-roster-section').removeClass('hidden');
					$('.js-visual-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					$('.nav-button-text').text('Rosters');
					$('.js-nav-list-item').removeClass('hidden');
					$('.js-rosters-item').addClass('hidden');
					break;
				case "Formations":
					$('.js-formations-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-visual-section').addClass('hidden');
					$('.js-team-section').addClass('hidden');
					$('.nav-button-text').text('Formations');
					$('.js-nav-list-item').removeClass('hidden');
					$('.js-formations-item').addClass('hidden');
					break;
				case "Team":
					$('.js-team-section').removeClass('hidden');
					$('.js-roster-section').addClass('hidden');
					$('.js-formations-section').addClass('hidden');
					$('.js-visual-section').addClass('hidden');
					$('.nav-button-text').text('Team');
					$('.js-nav-list-item').removeClass('hidden');
					$('.js-team-item').addClass('hidden');
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

	//handlePlayerScreenEvents();
	//handleFormationScreenEvents();
	//handleRosterScreenEvents();
});