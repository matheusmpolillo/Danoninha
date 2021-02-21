const moment = require('moment-timezone');
const request = require('../services/request.js');
const schedule = require('../services/cache.js').schedule;
const errorArgs = require('../services/cache.js').errorReplies.args;

module.exports = async (method, event = null, datetime = null, repeat = null) => {
	let reply = '';
	let response = '';
	if (!method) return errorArgs;
	switch (method.toLowerCase()) {
		case 'show':
			response = await request(`${process.env.DANONINHA_API_URL}/getEvent`, 'GET', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			}, { event: 'all' });
			if (response.length > 0) {
				response.forEach(event => {
					let repeat = event.repeat ? 'repete' : 'não repete';
					reply += `*${event.event}:* ${event.date} (${repeat})\n`;
				});
			} else reply = 'There are no events';
			break;
		case 'add':
			if (!event || !datetime || !repeat) return errorArgs;
			event = event.replace(/_/g, ' ');
			datetime = `2021-${datetime.replace(/T/g, ' ')}`;
			if (repeat === 'true' || Number(repeat) === 1) repeat = true;
			else if (repeat === 'false' || Number(repeat) === 0) repeat = false;
			else {
				reply = 'Wrong boolean repetition argument';
				break;
			}
			response = await request(`${process.env.DANONINHA_API_URL}/newEvent`, 'POST', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			}, {
				event: event,
				date: moment(datetime).tz(process.env.MOMENT_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
				repeat: repeat === 'true'
			});
			if (response === 'OK') reply = `*${event}* successfully added`;
			else reply = response;
			break;
		case 'remove':
			if (!event) return errorArgs;
			event = event.replace(/_/g, ' ');
			response = await request(`${process.env.DANONINHA_API_URL}/removeEvent`, 'POST', {
				username: process.env.DANONINHA_API_USER,
				password: process.env.DANONINHA_API_PASS
			}, { event: event });
			if (response === 'OK') reply = `*${event}* successfully removed`;
			else reply = response;
			break;
	}

	return { type: 'replyWithMarkdown', message: reply };
};