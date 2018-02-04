function Heartbeat() {
	var _url = '';
	
	this.init = function init() {
		/*if(!KnuddelsServer.getExternalServerAccess().canAccessURL(_url)) {
			KnuddelsServer.getDefaultLogger().warn('[Heartbeat] access error');
			return;
		}*/
		
		try {
			KnuddelsServer.getExternalServerAccess().touchURL(_url, {
				method:		'GET',
				onSuccess:	function onSuccess(data, response) {
					KnuddelsServer.getDefaultLogger().info('[Heartbeat] sended ' + response);
				},
				onFailure: function onFailure(data, response) {
					KnuddelsServer.getDefaultLogger().warn('[Heartbeat] error ' + response);
				}
			});
		} catch(e) {
			KnuddelsServer.getDefaultLogger().warn('[Heartbeat] exception ' + e);			
		}
	};
	
	//this.init();
}
