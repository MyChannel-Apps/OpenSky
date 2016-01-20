function Bank() {
	this.onAccountReceivedKnuddel = function onAccountReceivedKnuddel(user, amount, reason, account) {
		user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
	};
	
	this.onAccountChangedKnuddelAmount = function onAccountChangedKnuddelAmount(user, account) {
		user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
	};
}