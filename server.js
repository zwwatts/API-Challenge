var LolApi = require('leagueapi');
var http = require('http');

// MY KEY!! no stealerino
LolApi.init('0b569de1-9c38-4e8b-a802-a6032910689c', 'na');

//404 response
function send404Response(response) {
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}

//Handle request to server
function onRequest(request, response){
    if (request.method == 'GET') {
        console.log("GET request");
        response.writeHead(200, {"Context-Type": "text/json"});
        response.write(JSON.stringify(LolApi));
        console.log(JSON.stringify(LolApi));
        response.end();
    }
    else {
        console.log("404 request");
        send404Response(response);
    }
}

http.createServer(onRequest).listen(3000);

var toExport = {};
toExport.LolApi = LolApi;

module.exports = toExport;



/*if (summoner) {
    console.log(summoner.id);
    LolApi.getMatchHistory(summoner.id, 'na', function(err, history) {
        if(!err) {
            console.log(history);
        }
    });
}*/