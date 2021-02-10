module.exports = {
	'sch': require('./schedule.js'),
	'status': () => { return { type: 'reply', message: 'Online' }; }
};