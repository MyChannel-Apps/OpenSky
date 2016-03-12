function SmileyCode() {
	var _instance	= this;
	var _started	= false;
	
	this.open = function open(user, params) {
		if(_started) {
			user.sendPrivateMessage('°>smileybox/present_girlgift.png<° Du kannst dich nicht mehr für die _°BB>_hSmileycode Verlosung|/helping SmileyCode-Verlosung<r°_ anmelden, da diese gerade gestartet wurde.');
			return;
		}
		
		if(_instance.hasJoined(user)) {
			user.sendPrivateMessage('°>smileybox/present_girlgift.png<° Du hast dich bereits für die _°BB>_hSmileycode Verlosung|/helping SmileyCode-Verlosung<r°_ angemeldet!');
			return;
		}
		
		user.sendPrivateMessage('°>smileybox/present_girlgift.png<° Du hast dich erfolgreich für die _°BB>_hSmileycode Verlosung|/helping SmileyCode-Verlosung<r°_ angemeldet, die Ziehung erfolgt _um 21:15 Uhr_ hier im Channel.');
		user.getPersistence().setObject('SmileyCode', true);
		//user.sendEvent('SmileyCode',	_instance.hasJoined(user));
	};
	
	this.hasJoined = function hasJoined(user) {
		return user.getPersistence().getObject('SmileyCode', false);
	};
}