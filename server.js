#!/usr/bin/env node

"use strict";

var express = require('express');
var app = express();

const PORT=8080;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.use('/asset', express.static(__dirname + '/dist'));

app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:%s", PORT);
});

