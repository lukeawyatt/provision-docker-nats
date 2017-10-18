var NATS = require('nats');
var servers = ['nats://127.0.0.1:4222'];
var nats = NATS.connect({'servers': servers});

// Simple Publisher
nats.publish('foo', 'Hello World!');

// Simple Subscriber
nats.subscribe('foo', function(msg) {
  console.log('Received a message: ' + msg);
});

// Unsubscribing
var sid = nats.subscribe('foo', function(msg) {});
nats.unsubscribe(sid);

// Request Streams
var sid = nats.request('request', function(response) {
  console.log('Got a response in msg stream: ' + response);
});

// Request with Auto-Unsubscribe. Will unsubscribe after
// the first response is received via {'max':1}
nats.request('help', null, {'max':1}, function(response) {
  console.log('Got a response for help: ' + response);
});


// Request for single response with timeout.
nats.requestOne('help', null, {}, 1000, function(response) {
  // `NATS` is the library.
  if(response.code && response.code === NATS.REQ_TIMEOUT) {
    console.log('Request for help timed out.');
    return;
  }
  console.log('Got a response for help: ' + response);
});

// Replies
nats.subscribe('help', function(request, replyTo) {
  nats.publish(replyTo, 'I can help!');
});

// Close connection
nats.close();
