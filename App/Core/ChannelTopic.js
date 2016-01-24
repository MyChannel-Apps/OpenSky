function ChannelTopic() {
	this.onAppStart = function onAppStart() {
		var channel = KnuddelsServer.getChannel();
		
		// Nachricht
		var topic = '°#W+0020°_Herzlich Willkommen in unserem _°BB>_hChannel ' + channel.getChannelName() + '|/info ' + channel.getChannelName() + '<W°_.°#°Wir wünschen dir viel Spaß in unserem Dice-Channel!°##12°';
		
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
		
		channel.getChannelConfiguration().getChannelInformation().setTopic(topic);
	};
};