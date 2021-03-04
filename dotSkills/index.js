module.exports = {
	'sch': require('./schedule.js'),
	'status': (ctx) => ctx.reply('Online'),
	'env': (ctx) => ctx.reply(process.env.BOT_ENVIRONMENT),
	'ping': require('./ping.js'),
	'v': require('./version.js'),
	'cache': require('./cache.js'),
	'km': require('./mileage.js'),
	'bot': (ctx) => ctx.reply('t.me/DanoninhaTestBot')
};