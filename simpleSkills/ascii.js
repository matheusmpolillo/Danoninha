const ascii = require('../services/cache.js').ascii;
const errorArgs = require('../services/cache.js').errorReplies.args;
const errorAscii = require('../services/cache.js').errorReplies.ascii;

module.exports = (model) => {
	if (!model) return errorArgs;
	model = model.toLowerCase();
	if (!ascii.hasOwnProperty(model)) return errorAscii(model);
	return { type: 'replyWithMarkdown', message: ascii[model] };
};