function Bank() {
	/*this.onAccountReceivedKnuddel = function onAccountReceivedKnuddel(user, amount, reason, account) {
		user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
	};*/
	
	this.onAccountChangedKnuddelAmount = function onAccountChangedKnuddelAmount(user, account) {
		user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
	};
	
	this.payin = function payin(user) {
		new Popup(user, 'PayIn', 'Einzahlen', 'assets/knuddel.gif', 300, 250);
	};
	
	this.payout = function payout(user) {
		new Popup(user, 'PayOut', 'Auszahlen', 'assets/knuddel.gif', 300, 250);
	};
}