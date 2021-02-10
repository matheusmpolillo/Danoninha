module.exports = {
	'this is the way': () => { return { type: 'replyWithMarkdown', message: '_This is the way_' }; },
	'tilt': () => { return { type: 'reply', message: require('../services/cache.js').insults[Math.floor(Math.random() * (94 - 0)) + 0] }; },
	'yamete': () => { return { type: 'replyWithVoice', message: { source: `${__base}/audios/yamete.mp3` } }; },
	'delicia': () => { return { type: 'replyWithVoice', message: { source: `${__base}/audios/delicia.mp3` } }; }
};