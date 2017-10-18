#!/usr/bin/env node

'use strict';

var NATS = require('nats');
var servers = ['nats://127.0.0.1:4222'];
var nats = NATS.connect({'servers': servers});

nats.on('error', function(e) {
    console.log('Error [' + nats.options.url + ']: ' + e);
    process.exit();
});

nats.on('close', function() {
    console.log('CLOSED');
    process.exit();
});

var subject = process.argv[2];

if (!subject) {
    console.log('Usage: node-sub <subject>');
    process.exit();
}

console.log('Listening on [' + subject + ']');

nats.subscribe(subject, function(msg) {
    console.log('Received "' + msg + '"');
});

