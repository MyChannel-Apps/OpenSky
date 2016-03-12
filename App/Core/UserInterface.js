function UserInterface() {
	var _instance = this;
	
	this.init = function init() {
		setTimeout(function InitTimeout() {
			KnuddelsServer.getChannel().getOnlineUsers(UserType.Human).forEach(function UsersEach(user) {
				_instance.onUserJoined(user);
			});
		}, 1500);
	};
	
	this.onUserJoined = function onUserJoined(user) {
		switch(user.getClientType()) {
			case ClientType.Applet:
			case ClientType.Browser:
				_instance.open(user, 'Overview', 220, user.getPersistence().getObject('_ui_toggled', false) ? 100 : 400);
			break;
			case ClientType.Android:
				_instance.open(user, 'Overview', 400, 100);
			break;
			case ClientType.Offline:
				/* Do Nothing */
			break;
			default:
				KnuddelsServer.getDefaultLogger().warn('Unknown ClientType: ' + user.getClientType());
			break;
		}
	};
	
	this.open = function open(user, name, width, height) {
		var prefix	= '';
		var file	= name;
		
		switch(user.getClientType()) {
			/*case ClientType.Android:
				prefix = 'Android';
			break;*/
			case ClientType.IOS:
				prefix = 'iOS';
			break;
		}
		
		if(prefix.length > 0) {
			file += '@' + prefix;
		}
		
		var content			= AppContent.overlayContent(new HTMLFile(file + '.html', _instance.getData(user)), width, height);
		var configuration	= content.getLoadConfiguration();
		
		configuration.setBackgroundColor(Color.fromRGB(0, 40, 70));
		configuration.setForegroundColor(Color.fromRGB(255, 255, 255));
		configuration.setText('Lade OpenSky...');
		
		user.setAppContent(content);
	};
	
	this.toggle = function toggle(user) {
		user.getPersistence().setObject('_ui_toggled', !user.getPersistence().getObject('_ui_toggled', false));
		this.onUserJoined(user);
	};
	
	this.getData = function getData(user) {
		return {
			ui: {
				toggle:	user.getPersistence().getObject('_ui_toggled', false)
			},
			picture: 	user.getProfilePhoto(100, 100),
			knuddel:	user.getKnuddelAccount().getKnuddelAmount().asNumber()
		};
	};
	
	this.init();
}