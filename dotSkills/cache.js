const cache = require('../services/cache.js').RAM;
const alias = require('../services/alias.js').cache;

module.exports = (action, mod) => {
	let reply = '';
	mod = alias(mod);
	switch (action.toLowerCase()) {
		case 'check':
			if (mod === 'all') {
				Object.keys(cache).forEach(cacheName => {
					reply += `*${cacheName}:* ${cache[cacheName].length}\n`;
				});
			} else reply = `*${mod}:* ${cache[mod].length}`;
			break;
		case 'clear':
			if (cache.hasOwnProperty(mod)) {
				if (cache[mod].length < 1) reply = `*${mod}* cache already empty`;
				else {
					cache[mod] = [];
					reply = `*${mod}* cache cleared`;
				}
			} else reply = `*${mod}* cache does not exist`
			break;
	}

	return { type: 'replyWithMarkdown', message: reply };
}