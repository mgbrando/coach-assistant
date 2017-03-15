# Coach Assistant

## Screens
###Field Screen:
![Field Screen] (public/images/field-screen.png)
###Team Screen: 
![Team Screen] (public/images/team-screen.png)  
###Rosters Screen:
![Rosters Screen](public/images/rosters-screen.png)  
###Formations Screen:
![Formations Screen] (public/images/formations-screen.png)   

## Summary
The coach assistant app is an application made for soccer coaches.  With the app a coach can roster his players on the field before a game and save that roster. While rostering your players you are given a visual interface to look at. Players can be added as well. The same goes for formations. When you select a formation you will be given a new field view. Through the drag and drop interface (on larger screens) or through a player dropdown list (on smaller screens) you can place these players in different positions within the selected formation. When satisfied you can save that roster to use or edit at a later date. 

##Technology
* This app was built using HTML5, CSS, Javascript, and jQuery
* Normalize.CSS was used as a css starting point
* Twitter Bootstrap was used for more advanced css elements
* jQuery UI was used for the following functionality:
	* Draggable player objects
	* Droppable position elements
	* Selectable formation elements
* jQuery Touch Punch was used to create touch functionality for the jQuery UI items on smaller screens
* DataTables were used for sortable roster and player tables
* moment.js and datetime-moment.js were used to sort the roster table by the date created and last modified date.