const dotSkills = require('./dotSkills');
const simpleSkills = require('./simpleSkills');

module.exports = (bot) => {
	bot.on('text', (ctx) => {
		let chat = ctx.update.message.chat;
		let message = ctx.update.message.text;
		if (message.charAt(0) == '.') {
			if (chat.id == Number(process.env.ADMIN)) {
				let args = message.substring(1).split(' ');
				let cmd = args.shift().toLowerCase();
				if (dotSkills.hasOwnProperty(cmd)) {
					let response = dotSkills[cmd](...args);
					ctx[response.type](response.message);
				}
			} else ctx.reply(`${chat.first_name} ${chat.last_name} you are not an admin`);
		} else {
			message = message.toLowerCase();
			if (simpleSkills.hasOwnProperty(message)) {
				let response = simpleSkills[message]();
				ctx[response.type](response.message);
			}
		}
	});
};