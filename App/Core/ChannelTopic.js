function ChannelTopic() {
	this.onAppStart = function onAppStart() {
		var channel	= KnuddelsServer.getChannel();
		var topic	= '°#W+0020°_Herzlich Willkommen in unserem _°BB>_hChannel ' + channel.getChannelName() + '|/info ' + channel.getChannelName() + '<W°_.°#°Wir wünschen dir viel Spaß in unserem Dice-Channel!°##12°';
		
		/*
			INFO:
				Das hier sind die Original-Buttons.
				Wir ersetzten diese aber durch Grafiken (Siehe PSD "Topic-Buttons.psd"),
				damit diese auf den unterschiedlichen Endgeräten gleich aussehen!
			
			// Mein Konto
			topic += '°+0020>{button}Mein Konto||call|/KnuddelAccount list:' + KnuddelsServer.getDefaultBotUser().getNick() + '|icon|features/archaeologie/ft_11-09__medallion-smal_chattext.png|color|clearWhite|my|2<°';
			
			// Topliste
			topic += '°+0020>{button}Topliste||call|/AppTop|icon|quests/reward.png|color|clearWhite|my|2<°';
			
			// Readme
			topic += '°+0020>{button}Readme||call|/readme Hi|icon|sm_classic_00.gif|color|clearWhite|my|2<°';
			
			// Hilfe
			topic += '°+0020>{button}Hilfe||call|/helper|icon|bingo/buttonHelp.png|color|clearWhite|my|2<°';
			
			// Benachrichtigungen
			topic += '°>{button}Benachrichtigungen||call|/notifications|icon|bingo/buttonSoundOn.png|color|clearWhite|my|2<°';
		*/
		
		// Nachricht
		topic += '°+0020>' + KnuddelsServer.getFullImagePath('assets/buttons/bank...nopush.png') + '|' + KnuddelsServer.getFullImagePath('assets/buttons/bank_hover...nopush.png') + '<>|/KnuddelAccount list:' + KnuddelsServer.getDefaultBotUser().getNick() + '<° ';
		
		// Topliste
		topic += '°+0020>' + KnuddelsServer.getFullImagePath('assets/buttons/toplist...nopush.png') + '|' + KnuddelsServer.getFullImagePath('assets/buttons/toplist_hover...nopush.png') + '<>|/AppTop<° ';
		
		// Readme
		topic += '°+0020>' + KnuddelsServer.getFullImagePath('assets/buttons/readme...nopush.png') + '|' + KnuddelsServer.getFullImagePath('assets/buttons/readme_hover...nopush.png') + '<>|/readme Hi<° ';
		
		// Hilfe
		topic += '°+0020>' + KnuddelsServer.getFullImagePath('assets/buttons/help...nopush.png') + '|' + KnuddelsServer.getFullImagePath('assets/buttons/help_hover...nopush.png') + '<>|/helper<° ';
		
		// Benachrichtigungen
		topic += '°+0020>' + KnuddelsServer.getFullImagePath('assets/buttons/notifications...nopush.png') + '|' + KnuddelsServer.getFullImagePath('assets/buttons/notifications_hover...nopush.png') + '<>|/notifications<° ';
		
		channel.getChannelConfiguration().getChannelInformation().setTopic(topic);
	};
};