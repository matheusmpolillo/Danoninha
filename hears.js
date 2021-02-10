const dotSkills = require('./dotSkills');
const simpleSkills = require('./simpleSkills');

module.exports = (bot) => {
	bot.on('text', (ctx) => {
		let user = ctx.update.message.from;
		let message = ctx.update.message.text;
		if (message.charAt(0) == '.') {
			if (user.id == Number(process.env.ADMIN)) {
				let args = message.substring(1).split(' ');
				let cmd = args.shift().toLowerCase();
				if (dotSkills.hasOwnProperty(cmd)) {
					let response = dotSkills[cmd](...args);
					ctx[response.type](response.message);
				}
			} else ctx.reply(`${user.first_name} ${user.last_name} you are not an admin`);
		} else {
			message = message.toLowerCase();
			if (simpleSkills.hasOwnProperty(message)) {
				let response = simpleSkills[message]();
				ctx[response.type](response.message);
			}
		}
	});
};