"use strict";

const readline = require('readline');
const kismet = require('./kismet.jison');
const personality = require('./personality.js');

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
		console.log(
			"Greetings human! I am Kismet <3\n" +
			"Input a roll and press ENTER.\n" +
			"Exit with 'exit' or CTRL-D."
		);
		const rl = readline.createInterface(process.stdin, process.stdout);
		rl.setPrompt(">>> ");
		rl.prompt();

		rl.on("line", function(line) {
			if(line == "exit") {
				rl.close();
				return;
			} else if (!line) {
				rl.prompt()
				return;
			}
			var comment = personality.analyze(line);
			try {
				var result = kismet.parse(line)
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
			} catch(err) {
			}
			if(comment) {
				console.log(comment);
			}
			rl.prompt();
		}).on("close", function() {
			console.log("exit");
			process.exit(0);
		});
	}
};
