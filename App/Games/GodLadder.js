function GodLadder() {
	var _started = false;
	var _players;
	var _max_players = 10;
	const Price = {
		LOSE:	-1,
		DICE:	0,
		UP:		1
	};

	this.open = function open(user, params) {
		if(params.length == 0) {
			return;
		}
		
		if(_started) {
			user.sendPrivateMessage('GodLadder wurde bereits gestartet, warte bis die Runde beendet wurde.');
			return;
		}
		
		if(_players.size() >= _max_players) {
			user.sendPrivateMessage('Alle Plätze sind bereits belegt. Es können nur _maximal ' + _max_players + ' Nutzer_ dem Spiel beitreten. Warte bitte bis das laufende Spiel beendet wurde.');
			return;
		}
		
		var knuddel = parseInt(params);
		
		if(isNaN(knuddel)) {
			user.sendPrivateMessage('Wieviele _°>sm_classic_00.gif<r° Knuddel_ möchtest du denn einsetzen?');
			return;
		}
		
		if(knuddel <= 1) {
			user.sendPrivateMessage('Du kannst nur ab _°>sm_classic_00.gif<r° 2 Knuddel_ spielen.');
			return;
		}
	};
}