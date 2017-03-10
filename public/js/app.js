'use strict';

const applicationState = {
	players: {},
	formations: {},
	rosters: {},
	currentPlayerId: "",
	currentRosterId: "",
	currentFormationId: "",
	startPosition: {},
	rostersTable: null, 
	teamTable: null
};

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	$('#mySidenav.sidenav').addClass('screenAdjust');
	$('#main').addClass('screenAdjust');
    $('.js-closed-nav').addClass('hidden');
    $('.js-nav-components').removeClass('hidden');
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	$('#mySidenav.sidenav').removeClass('screenAdjust');
	$('#main').removeClass('screenAdjust');
    $('.js-closed-nav').removeClass('hidden');
    $('.js-nav-components').addClass('hidden');
}

function getPlayerInterfaces(players){
	getPlayersDisplay(players);
}

function getPlayersListItem(player){
	return `<li value="${player.id}">${player.name}</li>`;
}

function getPlayersDisplay(players){
	let html ='<div class="table-container-div table-responsive"><table id="team-table" class="table table-striped">';
	html += '<thead class="playerlist-header"><tr><th class="">First Name</th><th class="">Last Name</th><th class="">Status</th><th class="">Preferred Position</th><th class="center-text no-sort">Update</th><th class="center-text no-sort">Delete</th></tr></thead><tbody>';
	Object.keys(players).forEach(function(key){
		html+=players[key].getPlayerRow();
	});
	html+='</tbody></table></div>';
	$('.js-team').append(html);
	applicationState.teamTable = $('#team-table').DataTable({
		columnDefs: [
  			{ targets: 'no-sort', orderable: false }
		]
	});
}

function getFormationInterfaces(formations){
	getFormationDropDownList(formations);
}

function getFormationDropDownList(formations){
	let html='';
	Object.keys(formations).forEach(function(key){
		html+=formations[key].getFormationListItemRepr();
	});
	console.log('FORMATION -> '+html);
	$('#js-formation-list').append(html);
}
function getFormationDisplay(formations){

}

function getRosterInterfaces(rosters){
		console.log(`RAPROS: ${rosters[Object.keys(rosters)[0]].id} ${rosters[Object.keys(rosters)[0]].description} 
				${rosters[Object.keys(rosters)[0]].formationId} ${rosters[Object.keys(rosters)[0]].playerPositions}`);
	getRosterDropDownList(rosters);
	getRostersDisplay(rosters);
}
function getRosterDropDownList(rosters){
	let html='<li class="js-roster-list-item roster-item" data-value="new roster"><a class="js-nav-button nav-button" href="#">New Roster</a></li>';
	html+='<li class="divider"></li>';
	console.log(`RAPROS: ${rosters[Object.keys(rosters)[0]].id} ${rosters[Object.keys(rosters)[0]].description} 
				${rosters[Object.keys(rosters)[0]].formationId} ${rosters[Object.keys(rosters)[0]].playerPositions}`);
	Object.keys(rosters).forEach(function(key){
		html+=rosters[key].getRosterListItemRepr();
	});
	$('#js-roster-list').append(html);
}

function getRostersDisplay(rosters){
	let html ='<div class="table-container-div table-responsive"><table id="roster-table" class="table table-striped table-responsive">';
	html += `<thead class="rosterlist-header">
				<tr>
					<th class="">Description</th>
					<th class="">Date Created</th>
					<th class="">Last Modified</th>
					<th class="">Notes</th>
					<th class="center-text no-sort">Update</th>
					<th class="center-text no-sort">Delete</th>
				</tr>
			</thead>
			<tbody>`;
	Object.keys(rosters).forEach(function(key){
		html+=rosters[key].getRosterRow();
	});
	html+='</tbody></table></div>';
	$('.js-rosters').append(html);
	applicationState.rostersTable = $('#roster-table').DataTable({
		columnDefs: [
  			{ targets: 'no-sort', orderable: false }
		]
	});
}
function getRosterList(){
	let html = '';
	let count = 1;
	let rows=0;
	Object.keys(applicationState.rosters).forEach(function(key){
		const roster = applicationState.rosters[key];
		if(count === 1){
			html+='<div class="row">';
		}
		if((count % 3)===0){
			html+='</div><div class="row">';
			count++;
		}
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

function setRosterName(name){
	$('.js-roster-name').text(name);
}

//create delete and update for players
function updatePlayerInterfaces(method, player){
	return new Promise(function(resolve, reject){
	if(method==='create'){
		applicationState.players[player.id]=player;
		$('ul#12').append(`<li class="js-position position ui-widget-header">Bench</li>`);
		const firstEmptyBenchPosition = $('ul#12 li:not(:has(*))').first();
		Object.keys(applicationState.rosters).forEach(function(key){
			applicationState.rosters[key].playerPositions.push({layer: 12, position: firstEmptyBenchPosition.index()+1, playerId: player.id});
			RosterService.updateRoster(applicationState.rosters[key].getRosterObject());
		});
		firstEmptyBenchPosition.append(player.getPlayerDraggableDiv());
		$('.js-players-list').append(player.getPlayerListItemRepr());
		applicationState.teamTable.row.add($(player.getPlayerRow())[0]).draw();
		bindPlayerRowEvents(`.player-entry[data-playerId="${player.id}"]`);
		handleDraggableAndDroppable();
		resolve('OK');
	}
	else if(method === 'update'){
		console.log('IN UPDATE');
		$(`div.player-filled[data-playerId="${player.id}"]`).text(player.getFullName());
		applicationState.players[player.id]=player;
		console.log('PAST IF');
		resolve('OK');
	}
	else{
		$(`tr.player-entry[data-playerId="${player.id}"]`).remove();
		const playerDiv = $(`div[data-playerId="${player.id}"]`);
		const layer = playerDiv.closest('ul').attr('id');
		const position = playerDiv.parent().attr('data-position');
		playerDiv.parent().removeClass('slot-filled');
		playerDiv.remove();
		$('ul#12 li:not(:has(*))').first().remove();
		let visualText = position;
		if(layer === 12)
			visualText = 'Goalie';
		$(`.row[data-layer="${layer}"] div[data-position="${position}"] div.visual-position`).text(visualText);
		delete applicationState.players[player.id];
		resolve('OK');
	}
});
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
		}
		if((count % 4)===0){
			html+='</div><div class="row">';
			count++;
		}
		html+=`<div class="col-xs-4 formation-container"><div class="noselect js-formation formation ui-widget-content" data-formationId="${formation.id}"><span class="formation-name-text">${formation.name}</span></div></div>`;
		count++;
	});
	return html+'</div>';
}

function formationUsedInRoster(formationId){
	let formationExistsInRoster = {exists: false, rosters: []};
	Object.keys(applicationState.rosters).forEach(function(key){
		if(applicationState.rosters[key].formationId === formationId){
			formationExistsInRoster.exists = true;
			formationExistsInRoster.rosters.push(applicationState.rosters[key].description);
		}
	});
	return formationExistsInRoster;
}
//create and delete only for formations
function updateFormationInterfaces(method, formation){
	if(method==='create'){
		applicationState.formations[formation.id] = formation;
		if($('.js-formation-listing div.row:last-child > div').length === 3){
			$('.js-formation-listing')
				.append(`<div class="row">${formation.getHtmlRepr()}</div>`);
		}
		else{
			$('.js-formation-listing div.row:last-child')
				.append(formation.getHtmlRepr());
		}
		$('#js-formation-list').append(formation.getFormationListItemRepr());
	}
	else{
		for(let i = 0; i < formation.length; i++){
				if(applicationState.formations[formation[i]].name === $('#formations-dropdown .formation-button-text').text())
					$('#js-formation-list li:first-child a').trigger('click');
				delete applicationState.formations[formation[i]];
		}
		$('.js-formation-listing').html(getFormationList());
		$('#js-formation-list').empty();
		getFormationDropDownList(applicationState.formations);
		//$(`#js-formation-list li[data-value="${formation.id}"]`).remove();

		//NEEDED
		//$('.js-formation-listing').append(getFormationList());
		//$(`.js-formation-listing div.row`).children(`div[data-formationId="${formation.id}"]`).remove().end().		
		//delete applicationState.formations[formation.id];
	}
}

//create, delete and update for rosters
function updateRosterInterfaces(method, roster){
	if(method==='create'){
		applicationState.rosters[roster.id] = roster;
		$('#js-roster-list').append(roster.getRosterListItemRepr());
		$('#js-roster-list li:last-child').trigger('click');
		applicationState.rostersTable.row.add($(roster.getRosterRow())[0]).draw();
		bindRosterRowEvents(`.roster-entry[data-rosterId="${roster.id}"]`);
	}
	else if(method === 'update'){
		const oldRoster = applicationState.rosters[roster.id];
		applicationState.rosters[roster.id]=new Roster(roster);
		if(oldRoster.description === $('.roster-button-text').text())
			$('.roster-button-text').text(roster.description);
		$(`.js-roster-list-item[data-value="${roster.id}"] a`).text(roster.description);
		$(`tr.roster-entry[data-rosterId="${roster.id}"] td`).each(function(){
			const dataType = $(this).attr('data-type');
			if(dataType !== "dateCreated" && dataType !== "button"){
				console.log('DATATYPE: '+dataType);
				$(this).text(roster[dataType]);
			}
		});
		$('#js-update-description').val(roster.description);
		$('#js-update-notes').val(roster.notes);
	}
	else{
		if(applicationState.rosters[roster.id].description === $('.roster-button-text').text())
			$('#js-roster-list li[data-value="new roster"]').trigger('click');
		applicationState.rostersTable.row($(`tr.roster-entry[data-rosterId="${roster.id}"]`)).remove().draw();
		$(`#js-roster-list li[data-value="${roster.id}"]`).remove();
		delete applicationState[roster.id];
	}
}

function getPlayersDropDown(dropDownNumber){
	const players = applicationState.players;
	let html = `<div class="dropdown players-dropdown">
  					<button class="btn btn-default btn-sm dropdown-toggle" type="button" id="players-dropdown${dropDownNumber}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    					<span class="player-button-text">Empty</span>
    					<span class="caret"></span>
  					</button>
  					<ul class="dropdown-menu js-players-list" aria-labelledby="players-dropdown${dropDownNumber}">
  					<li class="js-player-list-item js-player-item hidden" data-value="empty"><a class="js-nav-button nav-button" href="#">Empty</a></li>`;
  	Object.keys(players).forEach(function(key){
  		html+=players[key].getPlayerListItemRepr();
  	});		
  	html+='</ul></div>';

  	return html;
}

function getVisualLayersByRoster(roster){
	console.log('THIS IS ROSTER FORMATION ID: '+roster.formationId);
	const layers = applicationState.formations[roster.formationId].layers;
	const layersLength=layers.length;
	const playerPositions = roster.playerPositions;
	console.log('OMGGGG '+(applicationState.formations[roster.formationId]).layers);
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	let playerDropDownCount = 0;
	for(let i = 0; i < layersLength; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}" class="positions-ul${i+1}">`;
		visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;
		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position ui-widget-content position ui-widget-header noselect" data-position="${j+1}">${j+1} ${getPlayersDropDown(++playerDropDownCount)}</li>`;
			if(positions === 5){
				visualHtml+=`<div class="col-xs-2 visual-position-container five-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 7){
				visualHtml+=`<div class="col-xs-1 visual-position-container seven-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 8){
				visualHtml+=`<div class="col-xs-1 visual-position-container eight-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 9){
				visualHtml+=`<div class="col-xs-1 visual-position-container nine-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 10){
				visualHtml+=`<div class="col-xs-1 visual-position-container ten-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else
				visualHtml+=`<div class="col-xs-${columnSize} visual-position-container" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="11">
				<div class="col-xs-12 visual-position-container" data-position="1"><div class="visual-position ui-widget-header noselect">Goalie</div></div>
				</div></div>`;
	draggableHtml+=`<div><header>Goalie</header><ul id="11" class="positions-ul11"><li class="js-position position ui-widget-header noselect" data-position="1">Goalie ${getPlayersDropDown(++playerDropDownCount)}</li></ul></div>`;
	draggableHtml+='<div><header>Bench</header><ul id="12" class="positions-ul12">';
	for(let n = 0; n < Object.keys(applicationState.players).length; n++){
		draggableHtml+=`<li class="js-position position ui-widget-header noselect" data-position="${n+1}">Bench</li>`;
	}
	draggableHtml+='</ul></div></div>'

	$('.js-player-positions').empty().append(draggableHtml);
	$('.js-main-visual').empty().append(visualHtml);
	
	  for(let k = 0; k < playerPositions.length; k++) {
		const layer = playerPositions[k].layer;
		const position = playerPositions[k].position;
		const player = applicationState.players[playerPositions[k].playerId];

		if(layer === 12){
			$('ul#12 li:not(:has(*))').first().append(player.getPlayerDraggableDiv());
		}
		else
			$(`ul#${layer} li[data-position="${position}"]`).append(player.getPlayerDraggableDiv());
	}

	handleSideBarOperations();
	handleDraggableAndDroppable();
}

function getPlayerItem(player){
	return `<div class="js-player-filled player-filled ui-widget-content noselect" data-playerId="${player.id}">${player.getFullName()}</div>`;
}

function getVisualLayersByFormation(formation){
	const layers = formation.layers;
	const layersLength=layers.length;
	let draggableHtml = '<div>';
	let visualHtml = `<div class="js-visual-container">`;
	let playerDropDownCount = 0;
	for(let i = 0; i < layersLength; i++){
		draggableHtml+=`<div><header>Layer ${i+1}</header><ul id="${i+1}" class="positions-ul${i+1}">`;
		visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="${i+1}">`;
		const positions = layers[i];
		const columnSize = 12/positions;
		for(let j = 0; j < positions; j++) {
			draggableHtml+=`<li class="js-position position ui-widget-header noselect" data-position="${j+1}">${j+1} ${getPlayersDropDown(++playerDropDownCount)}</li>`;
			if(positions === 5){
				visualHtml+=`<div class="col-xs-2 visual-position-container five-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 7){
				visualHtml+=`<div class="col-xs-1 visual-position-container seven-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 8){
				visualHtml+=`<div class="col-xs-1 visual-position-container eight-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 9){
				visualHtml+=`<div class="col-xs-1 visual-position-container nine-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else if(positions === 10){
				visualHtml+=`<div class="col-xs-1 visual-position-container ten-positions" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
			}
			else
				visualHtml+=`<div class="col-xs-${columnSize} visual-position-container" data-position="${j+1}"><div class="visual-position ui-widget-header noselect">${j+1}</div></div>`;
		}
		draggableHtml+='</ul></div>';
		visualHtml+='</div>';
	}
	visualHtml+=`<div class="row layers-${layersLength+1}" data-layer="11">
				<div class="col-xs-12 visual-position-container" data-position="1"><div class="visual-position ui-widget-header noselect">Goalie</div></div>
				</div></div>`;
	draggableHtml+=`<div><header>Goalie</header><ul id="11" class="positions-ul11"><li class="js-position position ui-widget-header noselect" data-position="1">Goalie ${getPlayersDropDown(++playerDropDownCount)}</li></ul></div>`;
	draggableHtml+='<div><header>Bench</header><ul id="12" class="positions-ul12">';
	for(let k=0; k < Object.keys(applicationState.players).length; k++){
		const playerDiv = getPlayerItem(applicationState.players[Object.keys(applicationState.players)[k]]);
		draggableHtml+=`<li class="js-position position ui-widget-header noselect" data-position="${k+1}">Bench ${playerDiv}</li>`;
		console.log('Line 337: '+ applicationState.formations[Object.keys(applicationState.formations)[0]].layers);//playerDiv);
	}
	draggableHtml+='</ul></div></div>';
	$('.js-player-positions').empty().append(draggableHtml);
	$('.js-main-visual').empty().append(visualHtml);

	//handlePlayerOperations();
	handleDraggableAndDroppable();
}

function getDraggableInterface(){

}

function getMainVisual(){

}
function handleInitialization(){
	console.log('HELLO!');
	const getPlayersPromise = PlayerService.getPlayers();
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
				});
			}
			else{
				console.log(players.length);
				for(let i = 0; i < players.length; i++){
					console.log('I AM IN HERE!');
					console.log(players[i]);
					const player = new Player(players[i]);
					applicationState.players[player.id] = player;
				}
			}
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
					});
				}
				else{
					for(let i = 0; i < formations.length; i++){
						const formation = new Formation(formations[i]);
						applicationState.formations[formation.id] = formation;
						console.log('THIS IS HTML: '+formation.getHtmlRepr(i));
					}
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
						console.log(`RAWRROSTER: ${roster.id} ${roster.formationId} ${roster.description} ${roster.playerPositions} `);
						roster = new Roster(roster);
						applicationState.rosters[roster.id] = roster;
						//$('.js-rosters').append(roster.getHtmlRepr());
						for(let field in applicationState.rosters[roster.id]){
							console.log('RAPTORS FIELD!: '+field);
						}
						resolve('OK');
					});
				}
				else{
					for(let i = 0; i < rosters.length; i++){
						const roster = new Roster(rosters[i]);
						applicationState.rosters[roster.id] = roster;
						console.log(applicationState.rosters[roster.id]);
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
		console.log(`ROSTORZZZZZZ: ${applicationState.rosters}`);
		$('.js-formation-listing').append(getFormationList());
		handleSideNavigation();
		handleFieldOperations();
		handlePlayerOperations();
		handleRosterOperations();
		handleFormationOperations();
		handleDraggableAndDroppable();
		handleErrorMessages();
		handleSideBarOperations();

		$(window).on('resize', function(event){
    		const windowWidth = $(window).width();
			if(windowWidth <= 450){
    			if($('.js-player-filled').hasClass('ui-draggable') && !$('.js-player-filled').hasClass('ui-draggable-disabled'))
    				$('.js-player-filled').draggable('disable');
			}
			else{
				if($('.js-player-filled').hasClass('ui-draggable-disabled')){
					$('.js-player-filled').draggable('enable');
				}
			}
		});
		if($(window).width() <= 450){
			$('.js-player-filled').draggable('disable');
		}
  		console.log('CURRENTROSTERID: '+applicationState.currentRosterId+' CURRENTFORMATIONID: '+applicationState.currentFormationId);
	});
}

function changeDropDownListView(type, id, selector = null){
	if(type === 'roster'){
		$(`#js-roster-list li[data-value="${applicationState.currentRosterId}"]`).removeClass('hidden');
		$(`#js-roster-list li[data-value="${id}"]`).addClass('hidden');
		if(id === 'new roster')
			$('.roster-button-text').text('New Roster');
		else	
			$('.roster-button-text').text(applicationState.rosters[id].description);
	}
	else if(type === 'formation'){
		$(`#js-formation-list li[data-value="${applicationState.currentFormationId}"]`).removeClass('hidden');
		$(`#js-formation-list li[data-value="${id}"]`).addClass('hidden');
		$('.formation-button-text').text(applicationState.formations[id].name);
	}
	else{
		console.log('SELECTOR TEST: '+selector.html);
		console.log(selector.find('a').text());
		selector.parents('ul').siblings('button').children('.player-button-text').text(selector.find('a').text());
		selector.siblings().removeClass('hidden');
		selector.addClass('hidden');
	}
}
function getPlayerPositions(){
	const players = applicationState.players;
	let playerPositions = [];
	$('.js-player-filled').each(function(){
		const layer = parseInt($(this).closest('ul').attr('id'));
			const position = parseInt($(this).parent().attr('data-position'));
			const playerId = $(this).attr('data-playerId');
			playerPositions.push({layer: layer, position: position, playerId: playerId});
	});
	console.log(playerPositions[0]);
	return playerPositions;
}
function rePositionPlayers(playerId, selector){
	let selection = selector.closest('.js-position');
	console.log(selector.parents('.js-position').html());
	const oldLayer = $(`.js-player-filled[data-playerId="${playerId}"]`).closest('ul').attr('id');
	const oldPosition = $(`.js-player-filled[data-playerId="${playerId}"]`).parent().attr('data-position');
	const currentPlayer = selector.parents('.js-position').children('.js-player-filled');
	if(currentPlayer.length !== 0){
		$(currentPlayer).detach().css({top: 0, left: 0}).appendTo(`ul#${oldLayer} li[data-position="${oldPosition}"]`);
		$(`ul#${oldLayer} li[data-position="${oldPosition}"]`).trigger('drop');
	}
	else if(oldLayer !== "12"){
		$(`ul#${oldLayer} li[data-position="${oldPosition}"]`).find('.player-button-text').text('Empty');
		$(`ul#${oldLayer} li[data-position="${oldPosition}"] .players-dropdown .js-players-list`).children().removeClass('hidden');
		$(`ul#${oldLayer} li[data-position="${oldPosition}"] .players-dropdown .js-players-list`).children('li[data-value="empty"]').addClass('hidden');
		$(`ul#${oldLayer} li[data-position="${oldPosition}"]`).removeClass('slot-filled');
		//$(`ul#${oldLayer} li[data-position="${oldPosition}"] .js-players-list li[data-value="empty"]`).trigger('click');
		let positionText = oldPosition+'';
		if(oldLayer === '11')
			positionText = 'Goalie';
		$(`.row[data-layer="${oldLayer}"] div[data-position="${oldPosition}"] div.visual-position`).text(positionText+'');
	}
	else{
		$(`.positions-ul12 li[data-position="${oldPosition}"]`).removeClass('slot-filled');
		$(`.row[data-layer="${oldLayer}"] div[data-position="${oldPosition}"] div.visual-position`).text(''+oldPosition);
	}
	$(`.js-player-filled[data-playerId="${playerId}"]`).detach().css({top: 0, left: 0}).appendTo($(selector).parents('li.js-position'));
	selector.parents('li.js-position').trigger('drop');
	handleDraggableAndDroppable();
	handleSideBarOperations();
}
function benchPlayer(benchPlayerId, selector){
	const currentLayer=selector.parents('ul[class^="positions-ul"]').attr('id');
	const currentPosition= selector.parents('li.position').attr('data-position');;
	const benchPosition = $('ul#12 li:not(:has(*))').first();
	//benchPosition$('.js-player-filled').hasClass('ui-draggable')
	$(selector).parents(('li.position')).removeClass('slot-filled');
	$(`.js-player-filled[data-playerId="${benchPlayerId}"]`).detach().css({top: 0, left: 0}).appendTo(benchPosition);
	//benchPosition.append($(`.js-player-filled[data-playerId="${benchPlayerId}"]`).replaceWith(''));
	$(`.row[data-layer="${currentLayer}"] div[data-position="${currentPosition}"] div.visual-position`).text(currentPosition);
	benchPosition.trigger('drop');
}
function handleSideBarOperations(){
	$('.js-players-list').each(function(){
		const ev = $._data(this, 'events');
        if(!(ev && ev.click)){
			$(this).on('click', 'li', function(){
				const playerId = $(this).attr('data-value');

				if(playerId === 'empty'){
					changeDropDownListView('player', playerId, $(this));
					const benchPlayerId = $(this).parents('li.js-position').children('.js-player-filled').attr('data-playerId');
					benchPlayer(benchPlayerId, $(this));
					console.log('FORMATIONID: '+applicationState.currentFormationId);
			}
			else{
				changeDropDownListView('player', playerId, $(this));
				rePositionPlayers(playerId, $(this));
			}
		});
        }
	});
}

/*Field Operations*/
function handleFieldOperations(){
	applicationState.currentRosterId = "new player";
	applicationState.currentFormationId = Object.keys(applicationState.formations)[0];

	$('#js-roster-list').on('click', 'li', function(){
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
			changeDropDownListView('roster', rosterId);
			console.log('FORMATIONID: '+applicationState.currentFormationId);
			getVisualLayersByFormation(applicationState.formations[applicationState.currentFormationId]);
			handleSideBarOperations();
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
			handleSideBarOperations();
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

	$('#save-roster-form').submit(function(event){
		event.preventDefault();
		const roster = {
    			formationId: applicationState.currentFormationId,
    			playerPositions: getPlayerPositions(),
    			description: $('#description').val(),
    			notes: $('#notes').val()
		};
		console.log('ROSTERRRRRRR '+roster);
		const addRosterPromise = RosterService.addRoster(roster);
		addRosterPromise.done(function(rosterObject){
			rosterObject = new Roster(rosterObject);
			updateRosterInterfaces('create', rosterObject);
			$('.js-roster-list li[data-value="${rosterObject.id}"]').trigger('click');
			$('#description').val('');
			$('#notes').val('');
			$('#myModal').modal('hide');
		});		
	});

	$('.js-update-roster-button').click(function(){
		const roster = {
			id: applicationState.currentRosterId,
    		formationId: applicationState.rosters[applicationState.currentRosterId].formationId,
    		playerPositions: getPlayerPositions(),
    		dateCreated: applicationState.rosters[applicationState.currentRosterId].dateCreated,
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
function bindRosterRowEvents(row){
	$(`${row} .js-roster-row-update-button`).click(function(){
		updateRosterRow($(this));
	});
	$(`${row} .js-roster-row-delete-button`).click(function(){
		deleteRosterRow($(this));
	});
}
function updateRosterRow(currentSelection){
		const rosterId = currentSelection.closest('tr').attr('data-rosterId');
		const oldRoster = applicationState.rosters[rosterId].getRosterObject();
		console.log(oldRoster.description);
		let newRoster = {
			id: rosterId,
			formationId: applicationState.rosters[rosterId].formationId,
			playerPositions: applicationState.rosters[rosterId].playerPositions
		};
		console.log('NEW ROSTER: '+newRoster);
		let count = 0;
		currentSelection.parent().siblings().each(function(){
			console.log(count);
			const field = $(this).attr('data-type');
			if(count < 4){
				newRoster[$(this).attr('data-type')] = $(this).text();
			}
			else{
				return false;
			}
			count++;
		});

		if(!objectsAreEqual(oldRoster, newRoster)){
			newRoster['lastModified'] = new Date().toDateString();
			const updateRosterPromise = RosterService.updateRoster(newRoster);
			updateRosterPromise.done(function(){
				updateRosterInterfaces('update', newRoster);
			});
		}
}

function deleteRosterRow(currentSelection){
		const rosterId = currentSelection.closest('tr').attr('data-rosterId');
		const roster = applicationState.rosters[rosterId];
		if(confirm(`Permanently delete Roster: ${applicationState.rosters[rosterId].description}?`)){
			const deleteRosterPromise = RosterService.deleteRoster(rosterId);
			deleteRosterPromise.done(function(){
				updateRosterInterfaces('delete', roster);
			});
		}
}
function handleRosterOperations(){

	$('.js-roster-row-update-button').click(function(){
		updateRosterRow($(this));
	});

	$('.js-roster-row-delete-button').click(function(){
		deleteRosterRow($(this));
	});

}

function handleFormationOperations(){
	$('.js-formation-listing').bind( "mousedown", function (e){
    	e.metaKey = true;
	}).selectable({filter: ".js-formation"});

	$('#js-layers-list').on('click', 'li a', function(){
		const layers = parseInt($(this).text());
		let layersHtml = '';
		$('#layer-dropdown .layers-button-text').text(layers+'');
		$('#js-layers-list li').removeClass('hidden');
		$(this).parent().addClass('hidden');
		for(let i = 0; i < layers; i++){
			layersHtml+=`<label for="positions-dropdown${i+1}">Layer ${i+1} Positions: </label> 
			             <div class="dropdown positions-dropdown${i+1}">
  							<button class="btn btn-default btn-sm dropdown-toggle" type="button" id="positions-dropdown${i+1}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    							<span class="positions-button-text">1</span>
    							<span class="caret"></span>
  							</button>
  							<ul id="js-positions-list${i+1}" class="dropdown-menu positions-dropdown" aria-labelledby="positions-dropdown${i+1}">
  								<li class="js-position-list-item hidden"><a class="js-layer-button layer-button" href="#">1</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">2</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">3</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">4</a></li>
  								<li class="js-position-list-item"><a class="js-position-button position-button" href="#">5</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">6</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">7</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">8</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">9</a></li>
    							<li class="js-position-list-item"><a class="js-position-button position-button" href="#">10</a></li>
  							</ul>
						</div></br>`;
		}
		$('#myFormationModal #save-formation-form').html(layersHtml);
		//bindPositionDropdownList();
	});

	$('#myFormationModal .modal-body').on('click', '.positions-dropdown li a', function(){
		const layer = parseInt($(this));
		const positions = parseInt($(this).text());
		let positionsHtml = '';
		console.log($(this).parents('ul').html());
		$(this).parents('ul').siblings('button').children('.positions-button-text').text(positions+'');
		$(this).parents('ul').children().removeClass('hidden');
		$(this).parent().addClass('hidden');
	});

	$('.js-save-formation-button').click(function(){
		let positionsFilled = 0;
		let layers = [];
		$('[id^="positions-dropdown"] .positions-button-text').each(function(){
			const layerPositions = parseInt($(this).text());
			positionsFilled+=layerPositions;
			layers.push(layerPositions);
		});

		let formationExists = false;
		Object.keys(applicationState.formations).forEach(function(key){
			if(JSON.stringify(applicationState.formations[key].layers) === JSON.stringify(layers)){
				formationExists = true;
			}
		});

		if(positionsFilled === 10 && !formationExists){
			if(!$('#myFormationModal .modal-body .error-message').hasClass('hidden'))
				$('#myFormationModal .modal-body .error-message').addClass('hidden');
			const addFormationPromise = FormationService.addFormation({layers: layers});
			addFormationPromise.done(function(formation){
				updateFormationInterfaces('create', new Formation(formation));
				$('#myFormationModal').modal('hide');
			});
		}
		else if(formationExists){
			console.log($('#saveFormationForm p:first-child').text());
			$('#myFormationModal .modal-body .formation-error-message').html('<p>This formation already exists.</p>').removeClass('hidden');
			console.log('This formation already exists');
		}
		else{
			$('.formation-error-message').html('<p>There must be a total of 11 positions amongst all of the layers.</p>').removeClass('hidden');
		}
	});

	$('.js-delete-formations-button').click(function(){
		let formationsToDelete = [];
		let formationsToKeep = [];

		if((Object.keys(applicationState.formations).length - $('.js-formation-listing .ui-selected').length) === 0){
			$('#myErrorModal .modal-body').empty().append('<p>There must be at least 1 formation left to be available for rosters.</p>');
			$('#myErrorModal').modal('show');	
			return;
		}

		$('.js-formation-listing .ui-selected').each(function(){
			const formationId = $(this).attr('data-formationId');
			const formationInUse = formationUsedInRoster(formationId);
			if(!formationInUse.exists)
				formationsToDelete.push(formationId);
			else
				formationsToKeep.push({
					formation: applicationState.formations[formationId].name,
					rosters: formationInUse.rosters
				});
		});
		console.log(formationsToDelete);
		const deleteFormationPromise = FormationService.deleteFormations(formationsToDelete);
		deleteFormationPromise.done(function(){
			updateFormationInterfaces('bulk-delete', formationsToDelete);
			//NEEDS TO BE IMPLEMENTED
			//updateFormationInterfaces('delete', );
			if(formationsToKeep.length > 0){
			let couldNotDeleteHtml = '<p>Could not delete the following formations because there are rosters using them: ';
			for(let i = 0; i < formationsToKeep.length; i++){
				for(let j = 0; j < formationsToKeep[i].rosters.length; j++){
					console.log(formationsToKeep[i].rosters[j]);
					if(formationsToKeep[i].rosters.length === 1)
						couldNotDeleteHtml+=`<div>Roster <${formationsToKeep[i].rosters[j]}> is using Formation <${formationsToKeep[i].formation}>.</div>`;
					else{
						if(j === 0){
							console.log(formationsToKeep[i].rosters[j]);
							couldNotDeleteHtml+=`<div>Rosters &lt;${formationsToKeep[i].rosters[j]}&gt;`;
						}
						else if(j !== formationsToKeep[i].rosters.length-1)
							couldNotDeleteHtml+=`, &lt;${formationsToKeep[i].rosters[j]}&gt;`;
						else
							couldNotDeleteHtml+=`, and &lt;${formationsToKeep[i].rosters[j]}&gt; are using Formation <${formationsToKeep[i].formation}>.</div>`
					}
				}
			}
			couldNotDeleteHtml+='<br/><div>You must delete the rosters using these formations in order to delete them.</div></p>';
			$('#myWarningModal .modal-body').empty().append(couldNotDeleteHtml);
			$('#myWarningModal').modal('show');
		}
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
			formationId: rosterObject.formationId,
			playerPositions: rosterObject.playerPositions,
			description: $('.js-roster-description').val(),
			notes: $('.js-roster-notes').val()
		};
		RosterService.addRoster({});
	});
}
function clearPlayerFields(){
	$('#firstName').val('');
	$('#lastName').val('');
	$('#status').val('');
	$('#preferredPosition').val('');
}

function bindPlayerRowEvents(row){
	$(`${row} .js-update-button`).click(function(){
		updatePlayerRow($(this));
	});
	$(`${row} .js-delete-button`).click(function(){
		deletePlayerRow($(this));
	});
}

function updatePlayerRow(currentSelection){
		const playerId = currentSelection.closest('tr').attr('data-playerId');
		const oldPlayer = applicationState.players[playerId].getPlayerObject();
		console.log(oldPlayer.status);
		let newPlayer = {id: playerId};
		console.log('NEW PLAYER: '+newPlayer);
		let count = 0;
		currentSelection.parent().siblings().each(function(){
			console.log(count);
			if(count < 4){
				newPlayer[$(this).attr('data-type')] = $(this).text();
			}
			count++;
		});

		if(!objectsAreEqual(oldPlayer, newPlayer)){
			const updatePlayerPromise = PlayerService.updatePlayer(newPlayer);
			updatePlayerPromise.done(function(){
				updatePlayerInterfaces('update', new Player(newPlayer));
			});
		}
}

function deletePlayerRow(currentSelection){
		const playerId = currentSelection.closest('tr').attr('data-playerId');
		const player = applicationState.players[playerId];
		if(confirm(`Permanently delete Player: ${applicationState.players[playerId].getFullName()}?`)){
			const deletePlayerPromise = PlayerService.deletePlayer(playerId);
			deletePlayerPromise.done(function(){
				const updatePlayerPromise = updatePlayerInterfaces('delete', player);
				updatePlayerPromise.then(function(){
				Object.keys(applicationState.rosters).forEach(function(key){
					let playerPositions = (applicationState.rosters[key].playerPositions);
					const positionsLength = playerPositions.length;
					for(let i = 0; i < playerPositions.length; i++){
						if(playerPositions[i].playerId === playerId){
							playerPositions.splice(i, 1);
							break;
						}
					}
					//console.log()
					if(positionsLength !== playerPositions.length){
						let rosterObject = applicationState.rosters[key].getRosterObject();
						rosterObject.playerPositions = playerPositions;
						console.log('Passed to server test: ');
						testPlayerPositions(rosterObject.playerPositions);
						const updateRosterPromise = RosterService.updateRoster(rosterObject);
						updateRosterPromise.done(function(){
							applicationState.rosters[key].playerPositions = playerPositions;
							console.log('After passed to server test: ');
							testPlayerPositions(applicationState.rosters[key].playerPositions);
						});
					}
				});
			});
			});
		}
		delete applicationState.players[playerId];
}
function testPlayerPositions(playerPositions){
	console.log(playerPositions.length);
	for(let i = 0; i < playerPositions.length; i++){
		console.log(`Position ${i+1}: ${playerPositions[i]}`)
	}
}
function handlePlayerOperations(){

	$('.js-update-button').click(function(){
		updatePlayerRow($(this));
	});

	$('.js-delete-button').click(function(){
		deletePlayerRow($(this));
	});

	$('#save-player-form').submit(function(event){
		event.preventDefault();
		const player = {
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			status: $('#status').val(),
			preferredPosition: $('#preferredPosition').val()
		};
		const addPlayerPromise = PlayerService.addPlayer(player);
		addPlayerPromise.done(function(player){
			updatePlayerInterfaces('create', new Player(player));
			clearPlayerFields();
		});
	});
}
function objectsAreEqual(object1, object2){
	if(typeof object1 === 'object' && typeof object2 === 'object'){
		if(Object.keys(object1).length === Object.keys(object2).length){
			for(let field in object1){
				if(Array.isArray(object1[field])){
					for(let i = 0; i < object1[field].length; i++){
						if(JSON.stringify(object1[field][i]) !== JSON.stringify(object2[field][i]))
							return false;
					}
				}
				else(object1[field].trim() !== object2[field].trim())
					return false;
			}
			return true;
		}
		return false;
	}
	return false;
}

function handleDraggable(){
	//$('.js-player-filled').draggable("destroy");
	$('.js-player-filled').each(function(){
		if(!$(this).data('ui-draggable')){
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
				$(this).siblings('.players-dropdown:hidden').children('.js-players-list').children(`li[data-value="${$(this).attr('data-playerId')}"]`).trigger('click');
				//$(this).siblings('.players-dropdown:hidden').find('.player-button-text').text($(this).text());
				$(`.row[data-layer="${layer}"] div[data-position="${position}"] div.visual-position`).text($(this).text());
			}
			const windowWidth = $(window).width();
			if(windowWidth <= 450){
				$(this).draggable('disable');
			}
		},
		start: function(ev, ui){

		},

		stop: function(ev, ui){

		},
		axis: 'y',
		containment: '.js-player-positions > div'
	});
	}
});
}

function handleDraggableAndDroppable(){
	handleDraggable();
	handleDroppable();
}

function handleDroppable(){
	$('.position').each(function(){
		if(!$(this).hasClass('ui-droppable')){
			$(this).droppable();
			$(this).on('drop',function(ev,ui){
				if(ui === undefined){
        			const layer = $(this).parent('ul').attr('id');
        			const position = $(this).addClass('slot-filled').attr('data-position');
        			console.log('LP: '+layer + position);
        			if(layer != '12'){
        				console.log($(this).find('.player-button-text').text());
        				$(this).find('.player-button-text').text($(this).children('.player-filled:last-child').text());
        				$(`.row[data-layer="${layer}"] div[data-position="${position}"] div.visual-position`).text($(this).children('.player-filled:last-child').text());
    				}	
				}
				else{
					const oldLayer = $(ui.draggable).closest('ul').attr('id');
    				const oldPosition = $(ui.draggable).parent().attr('data-position');
    				if($(this).children().length >= 2 || ($(this).children().length >= 1 && $(this).parent().attr('id') === '12')){
    					$(ui.draggable).siblings('.players-dropdown:hidden').children('button').children('.player-button-text').text($(this).children('.player-filled').text());
    					$(ui.draggable).siblings('.players-dropdown:hidden').children('.js-players-list').children().removeClass('hidden');
        				$(ui.draggable).siblings('.players-dropdown:hidden').children('.js-players-list').find(`li[data-value="${$(this).children('.player-filled').attr('data-playerId')}"]`).addClass('hidden');
        				$(`.row[data-layer="${oldLayer}"] div[data-position="${oldPosition}"] div.visual-position`).text($(this).children('.player-filled').text());
    					$(this).children('.player-filled').detach().css({top: 0, left: 0}).appendTo(`ul[id="${oldLayer}"] li[data-position="${oldPosition}"]`);
    				}
    				else{
    					$(ui.draggable).siblings('.players-dropdown:hidden').children('button').children('.player-button-text').text('Empty');
    					$(ui.draggable).siblings('.players-dropdown:hidden').children('.js-players-list').children().removeClass('hidden');
    					$(ui.draggable).siblings('.players-dropdown:hidden').children('.js-players-list').find('li[data-value="empty"]').addClass('hidden');
    					$(ui.draggable).parent().removeClass('slot-filled');
    					$(`.row[data-layer="${oldLayer}"] div[data-position="${oldPosition}"] div.visual-position`).text(''+oldPosition);
    				}
        			$(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
        			const layer = $(ui.draggable).closest('ul').attr('id');
        			const position = $(ui.draggable).parent().addClass('slot-filled').attr('data-position');
        			if(layer != '12'){
        				console.log($(ui.draggable).attr('data-playerId'));
        				console.log($(this).children('.players-dropdown:hidden').children('.js-players-list').html());
        				$(this).children('.players-dropdown:hidden').children('button').children('.player-button-text').text($(ui.draggable).text());
        				$(this).children('.players-dropdown:hidden').children('.js-players-list').children().removeClass('hidden');
        				$(this).children('.players-dropdown:hidden').children('.js-players-list').find(`li[data-value="${$(ui.draggable).attr('data-playerId')}"]`).addClass('hidden');
        				$(`.row[data-layer="${layer}"] div[data-position="${position}"] div.visual-position`).text($(ui.draggable).text());
        			}
    			}
			});
		}
	});
}

function handleErrorMessages(){
	$('.close-button').click(function(){
		if(!$('.error-message').hasClass('hidden'))
			$('.error-message').addClass('hidden');
	});
	$('.cancel-button').click(function(){
		if(!$('.error-message').hasClass('hidden'))
			$('.error-message').addClass('hidden');
	});
}
function handleSideNavigation(){
	$('.side-nav').on('click', '.js-nav-option', function(){
		const screen = this.text;
		if($(this).hasClass('hidden')){
			$('.js-nav-option').removeClass('hidden').addClass('hidden');
			$(this).removeClass('hidden');
		}
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
}

$(document).ready(function(){
	handleInitialization();
});