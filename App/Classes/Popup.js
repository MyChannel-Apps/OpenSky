function Popup(user, file, title, icon, width, height) {
	user.setAppContent(AppContent.popupContent(new HTMLFile(file + '.html', {
		window: {
			title:	title,
			icon:	KnuddelsServer.getFullImagePath(icon)
		}
	}), width, height));
}