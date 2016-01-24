var Overview = (new function Overview($) {
	var _instance = this;
	
	this.init = function init() {
		try {
			//Client.addEventListener('*', _instance.onReceive);
			document.addEventListener('eventReceived', _instance.onReceive);
			
			if(Client.pageData != undefined) {
				for(var index in Client.pageData) {
					var key		= index;
					var value	= Client.pageData[index];
					Client.onSendEventReceived(key, JSON.stringify(value));
				}
			}
			
			$(document).on('click', '[data-action]', function(event) {
				var element	= $(this);
				var action	= element.data('action');
				
				switch(action) {
					case 'payin':
					case 'payout':
						Client.sendEvent('command', action);
					break;
					case 'game':
						Client.sendEvent('game', element.data('game'));
					break;
				}
			});
			
			if($('body').data('clienttype') == 'Android') {
				$('section ul').width((100 * $('section ul li').length) + 'px');
			}
		} catch(e) {
			Client.sendEvent('exception', {
				message:	e.message,
				stack:		e.stack
			});
		}
	};
	
	this.onReceive = function onReceive(event) {
		try {
			// var key	= event.type;
			// var data	= event.data;
			var key		= event.eventKey;
			var data	= event.eventData;
			
			switch(key) {
				case 'picture':
					$('header picture').css('background-image', 'url(' + data + ')');
				break;
				case 'knuddel':
					$('header aside label span').text(data + ' Knuddel');
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