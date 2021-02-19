module.exports = (cmd) => {
	switch (cmd) {
		case 'delícia':
		case 'deliça':
		case 'diliça':
			return 'delicia';
		default:
			return cmd;
	}
};