const request = require('../services/request.js');
const getRandomNumber = require('../services/utils.js').getRandomNumber;
const cache = require('../services/cache.js').RAM.imageLinks;

module.exports = async (reddit) => {
	if (!reddit) reddit = 'pic';
	let feed = await request(`https://www.reddit.com/r/${reddit}.json?sort=top&t=week`, 'GET');
	let reply = '';
	let type = '';
	let found = false;
	do {
		if (feed.hasOwnProperty('data') && feed.data && feed.data.hasOwnProperty('children') && feed.data.children) {
			let random = getRandomNumber(0, feed.data.children.length);
			let children = feed.data.children[random].data;
			if (!children.pinned && children.post_hint === 'image') {
				if (cache.indexOf(children.url) < 0) {
					found = true;
					cache.push(children.url);
					type = 'replyWithPhoto';
					reply = [children.url, { caption: `Random image from r/${reddit}` }];
				}
			} else {
				found = true;
				type = 'reply';
				reply = 'No images found';
			}
		}
	} while (!found);

	return { type: type, message: reply, extract: true };
};