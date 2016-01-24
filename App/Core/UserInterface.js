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
				_instance.open(user, 'Overview', 220, 400);
			break;
			case ClientType.Android:
				_instance.open(user, 'Overview', 400, 100);
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
			case ClientType.Android:
				prefix = 'Android';
			break;
			case ClientType.IOS:
				prefix = 'iOS';
			break;
		}
		
		if(prefix.length > 0) {
			file += '@' + prefix;
		}
		
		user.setAppContent(AppContent.overlayContent(new HTMLFile(file + '.html', _instance.getData(user)), width, height));
	};
	
	this.getData = function getData(user) {
		return {
			picture: 	user.getProfilePhoto(100, 100),
			knuddel:	user.getKnuddelAccount().getKnuddelAmount().asNumber()
		};
	};
	
	this.init();
}