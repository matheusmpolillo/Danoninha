const axios = require('axios');

module.exports = async (url, method, auth = null, body = null) => {
	let rawData = null;
	let requestParams = {
		url: url,
		method: method
	};
	if (auth) requestParams.auth = auth;
	if (body) requestParams.data = body;
	try {
		rawData = await axios(requestParams);
		rawData = rawData.data;
	} catch (e) {
		if (e.hasOwnProperty('response') && e.response !== undefined && e.response.hasOwnProperty('data')) rawData = e.response.data;
		else rawData = e.message;
	}
	return rawData;
};