const request = require('../services/request.js');
const version = require('../package.json').version;
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = async (ctx, app) => {
	let reply = '';
	if (!app) return errorArgs(ctx);
	switch (app.toLowerCase()) {
		case 'bot':
			reply = `*Bot:* v${version}`;
			break;
		case 'api':
			reply = await request(`${process.env.DANONINHA_API_URL}/version`, 'GET', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			});
			reply = `*API:* ${reply}`;
			break;
	}

	ctx.replyWithMarkdown(reply);
};