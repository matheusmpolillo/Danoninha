module.exports = {
	'this is the way': require('./titw.js'),
	'tilt': (ctx) => ctx.reply(require('../services/cache.js').insults[Math.floor(Math.random() * (94 - 0)) + 0]),
	'yamete': (ctx) => ctx.replyWithVoice({ source: `${__base}/audios/yamete.mp3` }),
	'delicia': (ctx) => ctx.replyWithVoice({ source: `${__base}/audios/delicia.mp3` }),
	'src': (ctx) => ctx.reply('https://github.com/matheusmpolillo/Danoninha'),
	'ascii': require('./ascii.js'),
	'help': (ctx) => ctx.replyWithMarkdown(require('../services/cache.js').helpReply),
	'r': require('./reddit.js'),
	'steal': (ctx) => ctx.replyWithMarkdown(`_${require('../services/cache.js').randomText.oblivion}_`),
	'all women are queens': (ctx) => ctx.reply(require('../services/cache.js').randomText.womanQueens),
	'bot': (ctx) => ctx.reply('t.me/DanoninhaBot')
};