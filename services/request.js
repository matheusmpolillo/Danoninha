const axios = require('axios');

module.exports = async (url, method, auth = null, body = null) => {
	let rawData = null;
	let requestParams = {
		url: url,
		method: method
	};
	if (auth) requestParams.auth = auth;
	if (body) requestParams.body = body;
	try {
		rawData = await axios(requestParams);
		rawData = rawData.data;
	} catch (e) {
		rawData = e.response.data;
	}
	return rawData;
};