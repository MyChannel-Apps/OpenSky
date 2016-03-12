var Globals = (new function Globals($) {
	var _instance	= this;
	var _body		= $('body');
	
	this.init = function init() {
		_instance.window();
		
		setInterval(function() {
			_instance.window();
		}, 1000);
		
		$(document.body).on('click', '[data-tab]', function(event) {
			var element	= $(this);
			var tab		= element.data('tab');
			
			$('a[data-tab]').removeClass('active');
			element.addClass('active');
			
			$('input[name="tab"]').prop('checked', false);
			$('input[name="tab"]#' + tab).prop('checked', true);
		});
		
		$(document.body).on('click', '[data-action]', function(event) {
			var element	= $(this);
			var action	= element.data('action');
			
			switch(action) {
				case 'dismiss':
					Client.close();
				break;
				case 'payin':
					var knuddel = parseInt($('input[name="knuddel"]').val(), 10);
					
					if(isNaN(knuddel) || knuddel < 0) {
						knuddel = 0;
					}
					
					Client.executeSlashCommand('/appknuddel ' + Client.pageData.bot + ':' + knuddel);
					Client.close();
				break;
				case 'payout':
					var knuddel = parseInt($('input[name="knuddel"]').val(), 10);
					
					if(isNaN(knuddel) || knuddel < 0) {
						knuddel = 0;
					}
					
					Client.executeSlashCommand('/knuddelaccount payout:' + Client.pageData.app + ':' + knuddel);
					Client.close();
				break;
			}
		});
		
		this.setData(_body, 'client', Client.getClientType());
	};
	
	this.window = function window() {
		if(typeof(Client.pageData) != 'undefined' && typeof(Client.pageData.window) != 'undefined' && typeof(Client.pageData.window.icon) != 'undefined') {
			Client.getHostFrame().setIcon(Client.pageData.window.icon);
		}
		
		if(typeof(Client.pageData) != 'undefined' && typeof(Client.pageData.window) != 'undefined' && typeof(Client.pageData.window.icon) != 'undefined') {
			Client.getHostFrame().setTitle(Client.pageData.window.title);
		}
	};
	
	this.setData = function setData(element, name, data) {
		try {
			element.data(name, data);
		
			if(typeof(data) == 'boolean') {
				element.attr('data-' + name, data ? 'true' : 'false');
				return;
			}
			
			element.attr('data-' + name, data);
		} catch(e) {
			Client.sendEvent('exception', e);
		}
	};
	
	this.init();
}(jQuery));