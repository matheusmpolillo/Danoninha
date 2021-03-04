const ascii = require('../services/cache.js').ascii;
const errorArgs = require('../services/cache.js').errorReplies.args;
const errorAscii = require('../services/cache.js').errorReplies.ascii;

module.exports = (ctx, model) => {
	if (!model) return errorArgs(ctx);
	model = model.toLowerCase();
	if (!ascii.hasOwnProperty(model)) return errorAscii(ctx, model);
	ctx.replyWithMarkdown(ascii[model]);
};