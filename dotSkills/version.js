const request = require('../services/request.js');
const version = require('../package.json').version;
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = async (app) => {
	let reply = '';
	if (!app) return errorArgs;
	switch (app.toLowerCase()) {
		case 'bot':
			return { type: 'replyWithMarkdown', message: `*Bot:* v${version}` };
		case 'api':
			reply = await request(`${process.env.DANONINHA_API}/version`, 'GET');
			reply = `*API:* v${reply}`;
			return { type: 'replyWithMarkdown', message: reply };
	}
};