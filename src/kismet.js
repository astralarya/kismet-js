"use strict";

import kismet from './kismet.jison';
import personality from './personality.js';

module.exports = {
	parse: function (line) {
		let response = {};
		response.comment = personality.analyze(line);
		try {
			response.result = kismet.parse(line)
		} catch(err) {
			response.error = err;
		}
		return response;
	}
}
