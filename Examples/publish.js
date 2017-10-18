#!/usr/bin/env node

'use strict';

var NATS = require('nats');
var servers = ['nats://127.0.0.1:4222'];
var nats = NATS.connect({'servers': servers});

nats.on('error', function(e) {
    console.log('Error [' + nats.options.url + ']: ' + e);
    process.exit();
});

var subject = process.argv[2];
var msg = process.argv[3] || '';

if (!subject) {
    console.log('Usage: node-pub <subject> [msg]');
    process.exit();
}

nats.publish(subject, msg, function() {
    console.log('Published [' + subject + '] : "' + msg + '"');
    process.exit();
});
