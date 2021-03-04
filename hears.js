const dotSkills = require('./dotSkills');
const simpleSkills = require('./simpleSkills');
const alias = require('./services/alias.js').cmd;
const customErrors = require('./services/cache.js').customErrors;
const admins = require('./services/cache.js').admins;

module.exports = (bot) => {
	bot.on('text', async (ctx) => {
		let user = ctx.update.message.from;
		let message = ctx.update.message.text;
		let isDot = false;
		if (message.charAt(0) === '.') {
			isDot = true;
			message = message.substring(1);
		}
		let args = message.split(' ');
		let cmd = alias(args.shift().toLowerCase());
		if (isDot) {
			if (dotSkills.hasOwnProperty(cmd)) {
				if (user.id == Number(process.env.ADMIN)) {
					await dotSkills[cmd](ctx, ...args);
				} else ctx.reply(`${user.first_name} ${user.last_name} you are not an admin`);
			}
		} else {
			let response = null;
			if (simpleSkills.hasOwnProperty(message.toLowerCase())) {
				try {
					await simpleSkills[message.toLowerCase()](ctx);
				} catch(err) {
					let error = null;
					if (err.hasOwnProperty('code') && err.hasOwnProperty('on') && err.on.hasOwnProperty('method')) error = customErrors[error.code][error.method];
					else error = err.message;
					ctx.replyWithMarkdown(`*Error:* ${error}`);
				}
			}
			else if (simpleSkills.hasOwnProperty(cmd)) {
				try {
					await simpleSkills[cmd](ctx, ...args);
				} catch(err) {
					let error = null;
					if (err.hasOwnProperty('code') && err.hasOwnProperty('on') && err.on.hasOwnProperty('method')) error = customErrors[error.code][error.method];
					else error = err.message;
					ctx.replyWithMarkdown(`*Error:* ${error}`);
				}
			}
		}
	});
};