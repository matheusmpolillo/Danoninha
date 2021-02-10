require('dotenv').config();
global.__base = __dirname;
const { Composer } = require('micro-bot');
const bot = new Composer();
const hears = require('./hears.js');

hears(bot);

module.exports = bot;