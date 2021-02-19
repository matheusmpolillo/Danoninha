let count = 0;

module.exports = () => {
	let reply = '';
	if (count < 3) {
		count++;
		reply = '_This is the way_';
	} else {
		count = 0;
		reply = '_This is the_ *FUCKING* _way_';
	}
	return { type: 'replyWithMarkdown', message: reply };
};