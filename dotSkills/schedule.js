const moment = require('moment-timezone');
const schedule = require('../services/cache.js').schedule;

module.exports = (method, event, datetime = null) => {
	let reply = '';
	switch (method.toLowerCase()) {
		case 'show':
			let events = Object.keys(schedule);
			if (events.length > 0) {
				events.forEach(event => {
					reply += `*${event.replace(/_/g, ' ')}:* ${moment(schedule[event]).format('DD/MM/YYYY - HH:mm')}\n`;
				});
			} else reply = 'There are no events';
			return { type: 'replyWithMarkdown', message: reply };
		case 'add':
			datetime = `2020-${datetime.replace(/T/g, ' ')}`;
			schedule[event] = moment(datetime).tz(process.env.MOMENT_TIMEZONE).toDate();
			return { type: 'reply', message: `*${event.replace(/_/g, ' ')}* successfully added` };
		case 'remove':
			if (schedule.hasOwnProperty(event)) {
				delete schedule[event];
				return reply = `*${event.replace(/_/g, ' ')}* successfully removed`;
			} else reply = `*${event.replace(/_/g, ' ')}* event does not exist`;
			return { type: 'replyWithMarkdown', message: reply };
	}
};