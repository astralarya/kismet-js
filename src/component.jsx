"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Kismet from './kismet.js';

let KismetConsole = React.createClass({
	getInitialState: function() {
		return {
			log: "",
		};
	},
	command: function(line) {
		let response = Kismet.parse(line);
		let log = "";
		if(this.callback) {
			this.callback(response.result);
			return;
		} else if (response.result) {
			if(response.result.formula != response.result.value) {
				if(response.result.breakdown != response.result.formula) {
					log += '[' + response.result.formula + ']: ' + response.result.breakdown + ' = ' + response.result.value + '\n';
				} else {
					log += '[' + response.result.formula + ']: ' + response.result.value + '\n';
				}
			} else {
				log += response.result.value + '\n';
			}
		}
		if(response.comment) {
			log += response.comment + '\n';
		}
		this.setState({
			log: this.state.log + log
		});
	},
	render: function() {
		return <p>ababa</p>;
	}
});

export function init(element) {
	ReactDOM.render(<KismetConsole />, element);
}
