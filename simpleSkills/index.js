module.exports = {
	'this is the way': require('./titw.js'),
	'tilt': () => { return { type: 'reply', message: require('../services/cache.js').insults[Math.floor(Math.random() * (94 - 0)) + 0] }; },
	'yamete': () => { return { type: 'replyWithVoice', message: { source: `${__base}/audios/yamete.mp3` } }; },
	'delicia': () => { return { type: 'replyWithVoice', message: { source: `${__base}/audios/delicia.mp3` } }; },
	'src': () => { return { type: 'reply', message: 'https://github.com/matheusmpolillo/Danoninha' }; },
	'ascii': require('./ascii.js'),
	'help': () => { return { type: 'replyWithMarkdown', message: require('../services/cache.js').helpReply }; }
};