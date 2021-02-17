const request = require('../services/request.js');
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = async (host) => {
	let reply = '';
	if (!host) return errorArgs;
	switch (host.toLowerCase()) {
		case 'api':
			reply = await request(`${process.env.DANONINHA_API_URL}/ping`, 'GET', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			});
			if (reply === 'pong') reply = '*API:* pong';
			else reply = `*API*: failed (${reply})`;
			break;
		case 'mongo':
			reply = await request(`${process.env.DANONINHA_API_URL}/pingDb`, 'GET', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			});
			if (reply == 1 || reply == 2) reply = '*MongoDB:* pong';
			else {
				if (reply == 0) reply = 'disconnected';
				else if (reply == 3) reply = 'disconnecting';
				reply = `*MongoDB*: failed (${reply})`;
			}
			break;
	}
	return { type: 'replyWithMarkdown', message: reply };
};