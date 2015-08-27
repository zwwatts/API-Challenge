//'requires' may have to be converted to <script src="">?
//CURRENTLY IN THE PROCESS OF CORRECTLY HOOKING THIS FILE UP TO THE HTML

//Server has all of the functions from the LolApi (leaguejs),
//except it is already initialized with my key.
var server = require("./server.js");

alert('nerd');


var fs = require('fs');

var region = 'na';
var matches = {};
matches.before = {};
matches.after = {};

function setMatchesBeforeRanked(region) {
    return new Promise(function(resolve, reject) {
        fs.readFile('./5.11/RANKED_SOLO/' + region + '.json', 'utf8', function(err,data) {
            if (err) {
                reject(Error("Failed matches.before.ranked"));
            }
            resolve(data);
        });
    });
}

function setMatchesAfterRanked(region) {
    return new Promise(function(resolve, reject) {
        fs.readFile('./5.14/RANKED_SOLO/' + region + '.json', 'utf8', function(err,data) {
            if (err) {
                reject(Error("Failed matches.before.ranked"));
            }
            resolve(data);
        });
    });
}

function setChamps() {
    return new Promise(function(resolve, reject) {
        server.LolApi.Static.getChampionList(true, function(err, champsRetrieved) {
            resolve(champsRetrieved);
        });
    });
}

function setItems() {
    return new Promise(function(resolve, reject) {
        server.LolApi.Static.getItemList(true, function(err, items) {
            if (err) {
                reject(Error("Failed Items"));
            }
            resolve(items);
        });
    });
}

function setSummoner() {
    return new Promise(function(resolve, reject) {
        server.LolApi.Summoner.getByName('Foe One Flame', function(err, summonerRetrieved) {
            if(!err) {
                resolve(summonerRetrieved);
            }
            else {
                reject(Error("Failed Summoner"));
            }
        });
    })
}

//Nested loop to make sure all promises are fulfilled.
//All data will be accessed at the inner-most nest.
//Starts with the promise to set champs.
setChamps().then(function(result) {
    champs = result;
    
    //Promise to set items
    setItems().then(function(result) {
        items = result;
        
        var apItemIndexes = [3115, 3116, 3135, 3136, 3151, 3165,
                             3174, 3001, 3003, 3027, 3089];
        var apItems = [];
        for (var i in apItemIndexes) {
            apItems.push(items.data[apItemIndexes[i]].name);
        }
        
        //Promise to set summoner
        setSummoner().then(function(result) {
            summoner = result;
            
            //Promise to set matches.before.ranked
            setMatchesBeforeRanked(region).then(function(result) {
                matches.before.ranked = result;
                
                //Promise to set matches.after.ranked
                setMatchesAfterRanked(region).then(function(result) {
                    matches.after.ranked = result;
                    
                    //Do something with all of the data.
                    //Basically here should be functions that
                    // take in the data as parameters.
                    //The functions should be defined globally
                    // (outside of the nests).
                    updateItemNames(apItems);
                    alert('hello');
                    
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

function updateItemNames(apItems) {
    $('.item-container.rylais span').get(0).textContent = 'hello';//apItems[0];
}