const path = require('path');

module.exports = {
    context: __dirname + "/src",
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'kismet.js',
		library: 'Kismet'
    },
	node: {
		fs: 'empty'
	}
};
