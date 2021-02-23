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
					let response = await dotSkills[cmd](...args);
					ctx[response.type](response.message);
				} else ctx.reply(`${user.first_name} ${user.last_name} you are not an admin`);
			}
		} else {
			let response = null;
			if (simpleSkills.hasOwnProperty(message.toLowerCase())) response = await simpleSkills[message.toLowerCase()]();
			else if (simpleSkills.hasOwnProperty(cmd)) response = await simpleSkills[cmd](...args);
			if (typeof response.message === 'object') {
				try {
					await ctx[response.type](...response.message);
				} catch (err) {
					ctx.replyWithMarkdown(`*Error:* ${customErrors[err.code][err.on.method]}`);
				}
			}
			else {
				try {
					await ctx[response.type](response.message);
				} catch (err) {
					ctx.replyWithMarkdown(`*Error:* ${customErrors[err.code][err.on.method]}`);
				}
			}
		}
	});
};