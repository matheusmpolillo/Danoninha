require('dotenv').config();
global.__base = __dirname;
const { Composer } = require('micro-bot');
const bot = new Composer();
const modules = require('./modules');
const skills = require('./skills');

skills.insult(bot, modules.insults);
skills.hears(bot);

module.exports = bot;