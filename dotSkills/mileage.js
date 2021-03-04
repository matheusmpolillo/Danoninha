const request = require('../services/request.js');
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = async (ctx, method, km) => {
	let reply = '';
	let response = '';
	if (!method) return errorArgs(ctx);
	switch (method) {
		case 'show':
			response = await request(`${process.env.DANONINHA_API_URL}/mileage`, 'GET', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			});
			reply = `*${response}* traveled as a driver`;
			break;
		case 'add':
			if (!km) return errorArgs(ctx);
			km = Number(km);
			if (Number.isNaN(km)) reply = 'Non-numeric format';
			else if (!Number.isInteger(km)) reply = 'Non-integer number format';
			else {
				response = await request(`${process.env.DANONINHA_API_URL}/mileage`, 'POST', {
					username: process.env.DANONINHA_API_USER,
					password: process.env.DANONINHA_API_PASS
				}, { km: km });
				if (response === 'OK') reply = `*${km} km* successfully added`;
				else reply = response;
			}
			break;
		default:
			reply = 'Method non-existent'
			break;
	}

	ctx.replyWithMarkdown(reply);
};