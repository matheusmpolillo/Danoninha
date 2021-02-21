const dotSkills = require('./dotSkills');
const simpleSkills = require('./simpleSkills');
const alias = require('./services/alias.js');

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
			if (simpleSkills.hasOwnProperty(message.toLowerCase())) {
				let response = simpleSkills[message.toLowerCase()]();
				ctx[response.type](response.message);
			} else if (simpleSkills.hasOwnProperty(cmd)) {
				let response = await simpleSkills[cmd](...args);
				ctx[response.type](response.message);
			}
		}
	});
};