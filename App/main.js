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
		Classes:	[],
		Core:		[],
		Features:	[],
		Games:		[],
		Team:		[]
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
				App.exec(name + ' = new ' + name + '(); _instances.' + type + '.push(' + name + ');', Globals);
			} catch(e) {
				KnuddelsServer.getDefaultLogger().warn('Can\'t load "' + name + '"!');
				KnuddelsServer.getDefaultLogger().debug(e);
			}
		});
	};
	
	this.call = function call(name) {
		var args = Array.prototype.slice.call(arguments, 1) || [];
		
		for(var type in _instances) {
			_instances[type].forEach(function InstancesEach(instance) {
				if(typeof(instance[name]) != 'undefined') {
					instance[name].apply(this, args);
				}
			});
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
	
	this.mayJoinChannel = function mayJoinChannel(user) {
		if(!user.isAppManager() && !user.isChannelModerator()) {
			return ChannelJoinPermission.denied('Maintenance. Please visit °>OpenSky.ChannelApp.de|http://OpenSky.ChannelApp.de/<° for more informations.');
		}

		return ChannelJoinPermission.accepted();
	};
	
	this.chatCommands = {
		Helper: function Helper(user, params) {
			new Popup(user, 'Help', 'Hilfe', 'assets/knuddel.gif', 678, 528);
		}
	};
	
	this.toJSON = function toJSON() {
		return {};
	};
	
	this.toString = function toString() {
		return 'AppContainer';
	};
}());