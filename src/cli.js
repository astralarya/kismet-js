"use strict";

import readline from 'readline';
import kismet from './kismet.js';

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

			let response = kismet.parse(line);
			if(callback) {
				callback(response.result);
				return;
			} else if (response.result) {
				if(response.result.formula != response.result.value) {
					if(response.result.breakdown != response.result.formula) {
						console.log('[' + response.result.formula + ']: ' + response.result.breakdown + ' = ' + response.result.value);
					} else {
						console.log('[' + response.result.formula + ']: ' + response.result.value);
					}
				} else {
					console.log(response.result.value);
				}
			}
			if(response.comment) {
				console.log(response.comment);
			}
			rl.prompt();
		}).on("close", function() {
			console.log("exit");
			process.exit(0);
		});
	}
};
