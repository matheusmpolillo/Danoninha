const fs = require('fs');

module.exports = (bot) => {
	bot.on('text', (context) => {
		const message = context.update.message.text;
		switch (message.toLowerCase()) {
			case 'this is the way':
				context.reply('This is the way');
				break;
			case 'yamete':
				context.replyWithVoice({ source: `${__base}/audios/yamete.mp3` });
				break;
			case 'delícia':
			case 'delicia':
				context.replyWithVoice({ source: `${__base}/audios/delicia.mp3` });
				break;
		}
	});
};