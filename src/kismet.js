"use strict";

import parser from './parser.jison';
import personality from './personality.js';

module.exports = {
	parse: function (line) {
		let response = {};
		response.comment = personality.analyze(line);
		try {
			response.result = parser.parse(line)
		} catch(err) {
			response.error = err;
		}
		return response;
	}
}
