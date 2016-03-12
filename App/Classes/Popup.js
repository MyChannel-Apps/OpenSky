function Popup(user, file, title, icon, width, height, data) {
	data			= (typeof(data) == 'undefined' ? {} : data);
	data.bot		= KnuddelsServer.getDefaultBotUser().getNick();
	data.channel	= KnuddelsServer.getChannel().getChannelName();
	data.app		= KnuddelsServer.getAppAccess().getOwnInstance().getAppInfo().getRootAppUid();
	data.window		= {
		title:	title,
		icon:	KnuddelsServer.getFullImagePath(icon)
	};
	
	user.setAppContent(AppContent.popupContent(new HTMLFile(file + '.html', data), width, height));
}