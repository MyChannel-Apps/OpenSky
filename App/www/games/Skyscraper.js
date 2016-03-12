var Skyscraper = (new function($) {
	var _instance	= this;
	var _dices		= 1;
	
	this.init = function init() {
		//Client.addEventListener('*', _instance.onReceive);
		document.addEventListener('eventReceived', _instance.onReceive);
		
		if(Client.pageData != undefined) {
			for(var index in Client.pageData) {
				var key		= index;
				var value	= Client.pageData[index];
				Client.onSendEventReceived(key, JSON.stringify(value));
			}
		}
		
		_dices = parseInt($('input[name="dices"]').val(), 10);
		
		$(document.body).on('click', '[data-action]', function(event) {
			var element	= $(this);
			var action	= element.data('action');
			
			switch(action) {
				case 'start':
					var knuddel = parseInt(element.data('knuddel'), 10);
					
					Client.sendEvent('Skyscraper', {
						action:		action,
						knuddel:	knuddel,
						dices:		_dices
					});
				break;
			}
		});
		
		$(document.body).on('change', 'input[name="dices"]', function(event) {
			_dices = parseInt($(this).val(), 10);			
		});
	};
	
	this.onReceive = function onReceive(event) {
		try {
			// var key	= event.type;
			// var data	= event.data;
			var key		= event.eventKey;
			var data	= event.eventData;
			
			switch(key) {
				case 'settings':
					if(typeof(data.knuddel) != 'undefined') {
						data.knuddel.forEach(function(knuddel) {
							$('div.knuddel').append('<button data-action="start" data-knuddel="' + knuddel + '">' + knuddel + 'Kn</button>');
						});
					}
				break;
				case 'dice':
					Client.executeSlashCommand('/dice ' + data);
				break;
			}
		} catch(e) {
			Client.sendEvent('exception', {
				message:	e.message,
				stack:		e.stack
			});
		}
	};
	
	this.init();
}(jQuery));