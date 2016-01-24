var Globals = (new function Globals($) {
	var _instance = this;
	
	this.init = function init() {
		_instance.window();
		
		setInterval(function() {
			_instance.window();
		}, 1000);
		
		$(document.body).on('click', '[data-tab]', function(event) {
			var element = $(this);
			var tab = element.data('tab');
			
			$('a[data-tab]').removeClass('active');
			element.addClass('active');
			
			$('input[name="tab"]').prop('checked', false);
			$('input[name="tab"]#' + tab).prop('checked', true);
		});
		
		$(document.body).on('click', '[data-action]', function(event) {
			var element = $(this);
			var action = element.data('action');
			
			switch(action) {
				case 'dismiss':
					Client.close();
				break;
				case 'payin':
					var knuddel = parseInt($('input[name="knuddel"]').val(), 10);
					Client.executeSlashCommand('/appknuddel ' + Client.pageData.bot + ':' + knuddel);
					Client.close();
				break;
				case 'payout':
					var knuddel = parseInt($('input[name="knuddel"]').val(), 10);
					Client.executeSlashCommand('/knuddelaccount payout:' + Client.pageData.app + ':' + knuddel);
					Client.close();
				break;
			}
		});
	};
	
	this.window = function window() {
		Client.getHostFrame().setIcon(Client.pageData.window.icon);
		Client.getHostFrame().setTitle(Client.pageData.window.title);
	};
	
	this.init();
}(jQuery));