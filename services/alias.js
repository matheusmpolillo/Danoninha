module.exports.cmd = (cmd) => {
	switch (cmd) {
		case 'delícia':
		case 'deliça':
		case 'diliça':
			return 'delicia';
		default:
			return cmd;
	}
};

module.exports.cache = (mod) => {
	switch (mod) {
		case 'images':
		case 'links':
			return 'imageLinks';
		default:
			return mod;
	}
};