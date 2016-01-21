function Bank() {
	this.onAccountReceivedKnuddel = function onAccountReceivedKnuddel(user, amount, reason, account) {
		//user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
		//unnötig, da nach onAccountReceivedKnuddel automatisch onAccountChangedknuddelAmount aufgerufen wird
	};
	
	this.onAccountChangedKnuddelAmount = function onAccountChangedKnuddelAmount(user, account) {
		user.sendEvent('knuddel', account.getKnuddelAmount().asNumber());
	};
}
