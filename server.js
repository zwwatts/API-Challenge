var LolApi = require('leagueapi');
var http = require('http');

// MY KEY!! no stealerino
LolApi.init('0b569de1-9c38-4e8b-a802-a6032910689c', 'na');

//~~~~~~~~~~~~~~~~~~~~~~~~Begin Getters~~~~~~~~~~~~~~~~~~~~~~~~~~
function getMatchesBeforeRanked(region) {
    return new Promise(function(resolve, reject) {
        var fs = require('fs');
        fs.readFile('./5.11/RANKED_SOLO/' + region + '.json', 'utf8', function(err,data) {
            if (err) {
                reject(Error("Failed matches.before.ranked"));
            }
            resolve(data);
        });
    });
}

function getMatchesAfterRanked(region) {
    return new Promise(function(resolve, reject) {
        var fs = require('fs');
        fs.readFile('./5.14/RANKED_SOLO/' + region + '.json', 'utf8', function(err,data) {
            if (err) {
                reject(Error("Failed matches.before.ranked"));
            }
            resolve(data);
        });
    });
}

function getChamps() {
    return new Promise(function(resolve, reject) {
        LolApi.Static.getChampionList(true, function(err, champsRetrieved) {
            if (err) {
                reject(Error("Failed Champs"));
            }
            resolve(champsRetrieved);
        });
    });
}

function getItems() {
    return new Promise(function(resolve, reject) {
        LolApi.Static.getItemList(true, function(err, items) {
            if (err) {
                reject(Error("Failed Items"));
            }
            resolve(items);
        });
    });
}

function getSummoner() {
    return new Promise(function(resolve, reject) {
        LolApi.Summoner.getByName('Foe One Flame', function(err, summonerRetrieved) {
            if(!err) {
                resolve(summonerRetrieved);
            }
            else {
                reject(Error("Failed Summoner"));
            }
        });
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~End Getters~~~~~~~~~~~~~~~~~~~~~~~~~~~

//404 response
function send404Response(response) {
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}

//Handle request to server
//Response should return an object with a property for each get()
function onRequest(request, response, LolData){
    if (request.method == 'GET') {
        console.log("GET request");
        response.writeHead(200, {
            "Context-Type": "text/json",
            "Access-Control-Allow-Origin": "*"
        });
        
        response.write(JSON.stringify(LolData));
        console.log(JSON.stringify(LolData));
        response.end();
    }
    else {
        console.log("404 request");
        send404Response(response);
    }
}

var LolData = {};

//Nested loop to make sure all promises are fulfilled.
//All data will be accessed at the inner-most nest.
//Starts with the promise to set champs.
getChamps().then(function(result) {
    LolData.champs = result;
    
    //Promise to set items
    getItems().then(function(result) {
        LolData.items = result;
        
        var apItemIndexes = [3115, 3116, 3135, 3136, 3151, 3165,
                             3174, 3001, 3003, 3027, 3089];
        LolData.apItems = [];
        for (var i in apItemIndexes) {
            LolData.apItems.push(items.data[apItemIndexes[i]].name);
        }
        
        //Promise to set summoner
        getSummoner().then(function(result) {
            LolData.summoner = result;
            
            //Promise to set matches.before.ranked
            getMatchesBeforeRanked(region).then(function(result) {
                LolData.matches.before.ranked = result;
                
                //Promise to set matches.after.ranked
                getMatchesAfterRanked(region).then(function(result) {
                    LolData.matches.after.ranked = result;
                    
                    http.createServer(onRequest).listen(3000);
                    
                }).catch(function(err) {
                    
                });
            }).catch(function(err) {
                
            });
        }).catch(function(err) {
            
        });
    }).catch(function(err) {
        
    });
}).catch(function(err) {
    
});

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