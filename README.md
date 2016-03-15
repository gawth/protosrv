# protosrv

Noddy app that serves up a bunch of data on json and a protocol buffers endpoints.

This is part of an exercise to trial performance of alternatives to JSON over the wire.  The predominant success criteria is speed.

There are a number of Github repositories:

[Golang benchmark tests and primary write up of results](http://github.com/gawth/go-proto)

[Node.js server implementation](http://github.com/gawth/protosrv)

[.Net server implementation](https://github.com/gawth/proto-service)

[Protocol Buffer schema](https://github.com/gawth/hotel-proto)

##This Server
This is a node.js server implementation with two end points, one for JSON and one for Protocol Buffers.

It is __very__ simple.


To get up and running:

1. npm install
2. cd hotel-proto; git submodule init; git submodule update; cd ..
3. node index.js

Should then report that its listening on localhost:8899

To test that it is use curl:
    curl -is http://localhost:8899/testjson

##What's Happening

Uses restify for the server plumbing - the routes and the handlers.

Generates a bunch of hotel and room data.

Serves that hotel data via:

* http://localhost:8899/testjson
* http://localhost:8899/testproto

The JSON implementation just serves up the data.

The protocol buffers implementation loads the proto file (see the proto Git repository) and then encodes the generated data.

