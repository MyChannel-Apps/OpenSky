function Popup(user, file, title, icon, width, height) {
	user.setAppContent(AppContent.popupContent(new HTMLFile(file + '.html', {
		bot:		KnuddelsServer.getDefaultBotUser().getNick(),
		channel:	KnuddelsServer.getChannel().getChannelName(),
		app:		KnuddelsServer.getAppAccess().getOwnInstance().getAppInfo().getRootAppUid(),
		window:		{
			title:	title,
			icon:	KnuddelsServer.getFullImagePath(icon)
		}
	}), width, height));
}