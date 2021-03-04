const cache = require('../services/cache.js').RAM;
const alias = require('../services/alias.js').cache;
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = (ctx, action, mod) => {
	let reply = '';
	if (!mod) return errorArgs(ctx);
	mod = alias(mod);
	switch (action.toLowerCase()) {
		case 'check':
			if (mod === 'all') {
				Object.keys(cache).forEach(cacheName => {
					reply += `*${cacheName}:* ${cache[cacheName].length}\n`;
				});
			} else {
				if (cache.hasOwnProperty(mod)) reply = `*${mod}:* ${cache[mod].length}`;
				else reply = `*${mod}* cache does not exist`;
			}
			break;
		case 'clear':
			if (cache.hasOwnProperty(mod)) {
				if (cache[mod].length < 1) reply = `*${mod}* cache already empty`;
				else {
					cache[mod].length = 0;
					reply = `*${mod}* cache cleared`;
				}
			} else reply = `*${mod}* cache does not exist`
			break;
	}

	ctx.replyWithMarkdown(reply);
}