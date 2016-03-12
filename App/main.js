require('config.js');

/**
	Der globale Kontext der App.
	
	@property Globals
*/
var Globals	= this;

/**
	Die Hauptklasse der App
	
	@class App
	@static
*/
var App		= (new function AppContainer() {	
	var _instances = {
		Classes:	{},
		Core:		{},
		Features:	{},
		Games:		{},
		Team:		{}
	};

	/**
		Führt JavaScript-Code in einem Kontext aus
		
		@method exec
		@param {String} js JavaScript das ausgeführt werden soll
		@param {Object} context Der Kontext in dem der Code ausgeführt werden soll
		@return {Object} Der Kontext der von `eval` zurückgegeben wird
	*/
	this.exec = function exec(js, context) {
		return function EvalContext() {
			return eval(js);
		}.call(context);
	};
	
	this.load = function load(type) {
		Config[type].forEach(function CoreInstancesEach(name) {
			try {
				require(type + '/' + name + '.js');

				if(type == 'Classes' && name == 'Popup' || type == 'Settings') {
					return;
				}

				App.exec(name + ' = new ' + name + '(); _instances.' + type + '[\'' + name + '\'] = ' + name + ';', Globals);
			} catch(e) {
				KnuddelsServer.getDefaultLogger().warn('Can\'t load "' + name + '"!');
				KnuddelsServer.getDefaultLogger().debug(e);
			}
		});
	};
	
	this.call = function call(name) {
		var args = Array.prototype.slice.call(arguments, 1) || [];
		
		for(var type in _instances) {
			for(var entry in _instances[type]) {
				var instance = _instances[type][entry];
				
				if(typeof(instance[name]) != 'undefined') {
					instance[name].apply(this, args);
				}
			}
		}
	};
	
	/**
		Diese Methode wird aufgerufen, wenn die App gestartet wird
		@method onAppStart
	*/
	this.onAppStart = function onAppStart() {
		for(var type in _instances) {
			App.load(type);
		}
		
		App.call('onAppStart');
		
		setTimeout(function() {
			KnuddelsServer.getChannel().getOnlineUsers().forEach(function(user) {
				App.onUserJoined(user);
			});
		}, 2500);
	};
	
	/**
		Diese Methode wird aufgerufen, wenn ein Nutzer den Channel betritt
		
		@method onUserJoined
		@param {User} user Der Benutzer, der den Channel betritt
	*/
	this.onUserJoined = function onUserJoined(user) {
		App.call('onUserJoined', user);
	};
	
	this.onAccountReceivedKnuddel = function onAccountReceivedKnuddel(user, bot, amount, reason, account) {
		App.call('onAccountReceivedKnuddel', user, amount, reason, account);
	};
	
	this.onAccountChangedKnuddelAmount = function onAccountChangedKnuddelAmount(user, account) {
		App.call('onAccountChangedKnuddelAmount', user, account);
	};
	
	this.onUserDiced = function onUserDiced(event) {
		App.call('onDice', event);
	};
	
	this.mayJoinChannel = function mayJoinChannel(user) {
		if(!user.isAppManager() && !user.isChannelModerator()) {
			KnuddelsServer.getDefaultLogger().info('DECLINE: ' + user.getNick());
			return ChannelJoinPermission.denied('°RR°_WARTUNGSARBEITEN:_°r°#Derzeit kannst du den _°BB>ico_dice-6_001.gif<>|<>_h Channel ' + KnuddelsServer.getChannel().getChannelName() + '|/info ' + KnuddelsServer.getChannel().getChannelName() + '<r°_ nicht betreten, bitte versuche es zu einem späteren Zeitpunkt noch einmal.##Weitere Informationen findest du auf der °11>{button}Website||call|http://OpenSky.ChannelApp.de/|color|clearBlack|height|20|my|2<r° zu unserem OpenSource-Projekt.°##>CENTER<>' + KnuddelsServer.getFullImagePath('assets/ads/info.png') + '<°#°>LEFT<°');
		}

		return ChannelJoinPermission.accepted();
	};
	
	this.onEventReceived = function onEventReceived(user, type, data, session) {
		switch(type) {
			case 'game':
				if(typeof(_instances.Games[data]) == 'undefined') {
					user.sendPrivateMessage('Unbekanntes Spiel!');
					return;
				}
				
				_instances.Games[data].open.apply(this, [ user, '' ]);
			break;
			case 'command':
				switch(data) {
					case 'payin':
					case 'payout':
						Bank[data].apply(this, [ user ]);
					break;
					case 'notifications':
						App.chatCommands.Notifications(user);
					break;
					case 'help':
						App.chatCommands.Helper(user);
					break;
					case 'toggle':
						UserInterface.toggle(user);
					break;
				}
			break;
			default:
				if(typeof(_instances.Games[type]) != 'undefined' && typeof(data.action) != 'undefined' && typeof(_instances.Games[type][data.action]) != 'undefined') {
					_instances.Games[type][data.action].apply(this, [ user, data ]);
					return;
				}
				
				KnuddelsServer.getDefaultLogger().info(type + ': ' + JSON.stringify(data, 1, 4));
			break;
		}
	};
	
	this.chatCommands = {
		Helper: function Helper(user) {
			new Popup(user, 'Help', 'Hilfe', 'assets/knuddel.gif', 678, 528);
		},
		Notifications: function Notifications(user) {
			new Popup(user, 'Notifications', 'Benachrichtigungen', 'assets/knuddel.gif', 415, 680);
		}
	};
	
	this.toJSON = function toJSON() {
		return {};
	};
	
	this.toString = function toString() {
		return 'AppContainer';
	};
}());