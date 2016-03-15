var restify = require('restify');
var fs = require('fs');
var protobuf = require('protocol-buffers');

var messages = protobuf(fs.readFileSync('./hotel-proto/hotel.proto'));

function respondJson(req,res, next) {
    res.json(genData(50,10));
    next();
}

function respondProto(req, res, next) {
    res.setHeader('content-type', 'application/x-protobuf');
    var buf = messages.HotelDetailsResponseModel.encode(genData(50,10));
    res.write(buf);
    res.end();
    next();
}

var server = restify.createServer();
server.get('/testjson', respondJson);
server.get('/testproto', respondProto);

function genData(numHotels, numRooms) {
    var hotelsResp = {hotels: []};

    for (i=0; i<numHotels; i++) {
        var hotel = {
            id: '' + i,
            hotelCode: 'code' + i,
            hotelStatus: 'Ok',
            hotelCurrency: 'GBP',
            minutesOffsetUtc: 60,
            providerName: 'Provider',
            rooms: []
        }
        for (j=0; j<numRooms; j++){
            var room = {
                id: j,
                invCode: 'inv',
                rackRate: 'rack',
                hideRackRate: false
            }
            hotel.rooms.push(room);
        }
        hotelsResp.hotels.push(hotel);
    }

    return hotelsResp;
}

server.listen(8899,  function() {
    console.log('%s listening at %s', server.name, server.url);
});
