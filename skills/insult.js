module.exports = (bot, insults) => {
	bot.hears('.tilt', (context) => insults(context));
};