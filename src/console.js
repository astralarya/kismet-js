var prompt = require('prompt');
var kismet = require('./kismet.jison');

prompt.message = '';
prompt.delimiter = '';
prompt.colors = false;


/* exports */

module.exports = {
	/**
	 * Parse a dice roll and return the result
	 * @param {String} A dice roll
	 * @result Result of the roll
	 */
	parse: function(input) {
		return kismet.parse(input);
	},

	/**
	 * Start an interactive session
	 */
	prompt: function(callback) {
		var handler = function(err, input) {
			if(input.input !== 'quit') {
				var result;
				if(input.input) {
					result = kismet.parse(input.input)
				} else {
					result = kismet.parse('')
				}
				if(callback) {
					callback(result);
				} else {
					if(result.formula != result.value) {
						if(result.breakdown != result.formula) {
							console.log('[' + result.formula + ']: ' + result.breakdown + ' = ' + result.value);
						} else {
							console.log('[' + result.formula + ']: ' + result.value);
						}
					} else {
						console.log(result.value);
					}
				}
				loop();
			}
		}
		prompt.start();
		function loop() {
			prompt.get({
				properties: {
					input: {
						description: '>>>',
						type: 'string'
				}}
			},handler);
		};
		loop();
	}
};
