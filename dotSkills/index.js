module.exports = {
	'sch': require('./schedule.js'),
	'status': () => { return { type: 'reply', message: 'Online' }; },
	'env': () => { return { type: 'reply', message: process.env.ENVINROMENT } }
};