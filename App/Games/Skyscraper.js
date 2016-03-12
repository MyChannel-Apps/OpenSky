function SkyscraperInstance(user, dice_value, knuddel) {
	var _winning_total		= 0;
	var _winning			= undefined;
	
	this.init = function init() {
		user.sendEvent('dice', dice_value + 'W1000!', AppViewMode.Popup);
	};
	
	this.isSameUser = function isSameUser(u) {
		return u.getUserId() == user.getUserId();
	};
	
	this.onDice = function onDice(event) {
		var result			= event.getDiceResult();
		var total			= result.totalSum();
		var dices			= result.getSingleDiceResults();
		var result			= [];
		_winning_total		= total;
		
		if(!user.isOnlineInChannel()) {
			user.sendPrivateMessage('Du befindest dich leider nicht mehr im _°BB>_hChannel ' + KnuddelsServer.getChannel().getChannelName() + '|/go +' + KnuddelsServer.getChannel().getChannelName() + '<r°_.');
			return;
		}
		
		var second_result = [];
	
		for(var index in dices) {
			var entry	= dices[index];
			var dice	= entry.getDice();
			var amount	= dice.getAmount();
			var sides	= dice.getNumberOfSides();
			
			second_result.push({
				amount:		amount,
				sides:		sides,
				results:	entry.valuesRolled()
			});
			
			if(amount == dice_value && sides == 1000) {
				result	= entry.valuesRolled();
				break;
			}
		}
		
		if(typeof(_winning) != 'undefined') {
			this.calculatePrice(_winning, second_result);
			return;
		}
		
		if(result.length == 0) {
			return;
		}
		
		var data = [];
		
		for(var index in result) {
			data.push(this.calculateDice(result[index]));
		}
		
		this.calculateEnd(user, data);
	};
	
	this.calculatePrice = function calculatePrice(winning, second_result) {
		var result = winning;
		
		for(var entry in second_result) {
			result = this.priceByResults(result, second_result[entry]);
		}
		
		var won		= 0;
		
		for(var index in result) {
			var entry	= result[index];
			won			+= entry.knuddel;
		}
		
		if(won != _winning_total) {
			this.calculateEnd(user, _winning, true);
			return;
		}
		
		if(won >= 1) {
			//KBank.addKn(_user.getID(), won);
			
			if(won >= 10) {
				KnuddelsServer.getDefaultBotUser.sendPublicMessahe('°BB°' + user.getProfileLink() + ' hat _°>sm_classic_00.gif<rBB° ' + won + ' Knuddel_ gewonnen.');
			} else {
				user.sendPrivateMessage('Du hast _°>sm_classic_00.gif<r° ' + won + ' Knuddel_ gewonnen.');
			}
		}
		
		_winning = undefined;
	};
	
	this.priceByResults = function priceByResults(result, dice) {
		for(var index in result) {
			var entry = result[index];
			
			if(entry == null || entry == undefined) {
				continue;
			}
			
			if(entry.winning == 0) {
				delete result[index];
			}
			
			if(entry.winning == dice.sides) {
				result[index].knuddel = dice.results.shift();
			}
		}
		
		var temp = [];
		
		for(var index in result) {
			var entry = result[index];
			
			if(entry != null && entry != undefined) {
				temp.push(entry);
			}
		}
		
		return temp;
	};
	
	this.calculateEnd = function calculateEnd(user, data, failure) {
		failure = (typeof(failure) == 'undefined' ? false : failure);
		
		if(dice_value != data.length) {
			user.sendPrivateMessage('Du hast einen falschen Würfel benutzt. Bitte würfle mit °>' + dice_value + 'W' + _dice + '|/d ' + dice_value + 'W' + _dice + '<°!');
			return;
		}
		
		var total_costs		= 0;
		var total_points	= 0;
		var total_winning	= 0;
		var dice_link		= {};
		
		for(var entry in data) {
			var dice		= data[entry];
			
			total_costs		+= dice.costs;
			total_points	+= dice.points;
			
			if(dice.winning <= 0) {
				continue;
			}
			
			total_winning	+= dice.winning;
			
			if(dice_link[dice.winning] == undefined) {
				dice_link[dice.winning] = 0;
			}
			
			++dice_link[dice.winning];
		}
		
		if(failure) {
			user.sendEvent('can_dice', this.createDiceLink(dice_link), AppViewMode.Popup);
			user.sendPrivateMessage('Du hast die falschen Würfel benutzt. Würfle mit °>' + this.createDiceLink(dice_link) + '|/d ' + this.createDiceLink(dice_link) + '!<°!');
			return;
		}
		
		/*if(total_costs > KBank.getTotalKn(user.getUserId())) {
			user.private('Das Spiel konnte nicht gestartet werden da du zu wenig Guthaben besitzt. °>{button}Konto||call|/bank|color|clearWhite<°');
			return;
		}*/
		
		/*
		this.onKnuddelPay(user, total_costs, function startCallback() {
			if(total_points >= 1) {
				_currently_gaming = true;
				user.private('Du hast _' + Format(total_points) + ' °BB>_hSkyPoints|/SkyPoints<r°_ erreicht.');
				user.addPoints(total_points);
				
				if(_free) {
					App.removeFreeGame();
				}
			}
			
			if(total_winning >= 1) {
				_winning			= data;
				_currently_gaming	= true;
				
				App.spend();
				user.sendAppEvent('can_dice', _instance.createDiceLink(dice_link));
				user.private('Nun liegt es an dir wie viele Knuddel du gewinnst. Würfle mit °>' + _instance.createDiceLink(dice_link) + '|/d ' + _instance.createDiceLink(dice_link) + '!<° - Das Ergebnis ist dein Gewinn!');
			}	
		});*/
		
		if(total_winning >= 1) {
			user.sendEvent('can_dice', this.createDiceLink(dice_link), AppViewMode.Popup);
			user.sendPrivateMessage('Nun liegt es an dir wie viele Knuddel du gewinnst. Würfle mit °>' + this.createDiceLink(dice_link) + '|/d ' + this.createDiceLink(dice_link) + '!<° - Das Ergebnis ist dein Gewinn!');
		}
	};
	
	this.calculateDice = function calculateDice(value) {
		var points	= 0;
		var winning	= 0;
		
		if(this.between(value, 0, 649)) {
			points += knuddel;
		} else if(this.between(value, 650, 849)) {
			switch(knuddel) {
				case 1:
					winning = 2;
				break;
				case 2:
					winning = 4;
				break;
				case 5:
					winning = 10;
				break;
				case 10:
					winning = 20;
				break;
				case 20:
					winning = 40;
				break;
			}
		} else if(this.between(value, 850, 944)) {
			switch(knuddel) {
				case 1:
					winning = 5;
				break;
				case 2:
					winning = 10;
				break;
				case 5:
					winning = 25;
				break;
				case 10:
					winning = 50;
				break;
				case 20:
					winning = 100;
				break;
			}
		} else if(this.between(value, 945, 984)) {
			switch(knuddel) {
				case 1:
					winning = 10;
				break;
				case 2:
					winning = 20;
				break;
				case 5:
					winning = 50;
				break;
				case 10:
					winning = 100;
				break;
				case 20:
					winning = 200;
				break;
			}
		} else if(this.between(value, 985, 994)) {
			switch(knuddel) {
				case 1:
					winning = 15;
				break;
				case 2:
					winning = 30;
				break;
				case 5:
					winning = 75;
				break;
				case 10:
					winning = 150;
				break;
				case 20:
					winning = 300;
				break;
			}
		} else if(this.between(value, 995, 999)) {
			switch(knuddel) {
				case 1:
					winning = 25;
				break;
				case 2:
					winning = 50;
				break;
				case 5:
					winning = 125;
				break;
				case 10:
					winning = 250;
				break;
				case 20:
					winning = 500;
				break;
			}
		} else if(this.between(value, 1000)) {
			switch(knuddel) {
				case 1:
					winning = 50;
				break;
				case 2:
					winning = 100;
				break;
				case 5:
					winning = 250;
				break;
				case 10:
					winning = 500;
				break;
				case 20:
					winning = 1000;
				break;
			}		
		}
		
		return {
			value:		value,
			costs:		knuddel,
			points:		points,
			winning:	winning
		};
	};
	
	this.between = function(value, min, max) {
		if(typeof(max) == 'undefined') {
			return (value >= min);
		}
		
		return (value >= min && value <= max);
	};
	
	this.createDiceLink = function(array) {
		var string = '';
		
		for(var entry in array) {
			string += ' + ' + array[entry] + 'W' + entry;
		}
		
		return string.substr(3);
	};
	
	this.init();
};

function Skyscraper() {
	var _instances = {};
	
	this.open = function open(user) {
		new Popup(user, 'games/Skyscraper', 'Skyscraper', 'assets/knuddel.gif', 350, 500, {
			settings: {
				knuddel: Config.Settings.Skyscraper.knuddel
			}
		});
	};
	
	this.start = function start(user, data) {
		if(typeof(_instances[user.getUserId()]) != 'undefined') {
			user.sendPrivateMessage('Du hast derzeit noch ein offenen Würfelzug, den du noch beenden musst.');
			return;
		}
		
		if(typeof(data.dices) == 'undefined') {
			return;
		}
		
		data.dices = parseInt(data.dices, 10);
		
		if(isNaN(data.dices) || data.dices <= 0 || data.dices > Config.Settings.Skyscraper.dice_maximum) {
			user.sendPrivateMessage('Es sind nur Würfel _zwischen 1 und ' + Config.Settings.Skyscraper.dice_maximum + '_ erlaubt.');
			return;
		}
		
		if(typeof(data.knuddel) == 'undefined') {
			return;
		}
		
		data.knuddel = parseInt(data.knuddel, 10);
		
		if(isNaN(data.knuddel) || Config.Settings.Skyscraper.knuddel.indexOf(data.knuddel) == -1) {
			user.sendPrivateMessage('Du darfst nur folgende Knuddel zum spielen benutzen: ' + JSON.stringify(Config.Settings.Skyscraper.knuddel));
			return;
		}
		
		_instances[user.getUserId()] = new SkyscraperInstance(user, data.dices, data.knuddel);
	};
	
	this.onDice = function onDice(event) {
		if(typeof(_instances[event.getUser().getUserId()]) == 'undefined') {
			return;
		}
		
		if(!_instances[event.getUser().getUserId()].isSameUser(event.getUser())) {
			return;
		}
		
		_instances[event.getUser().getUserId()].onDice(event);
	};
}