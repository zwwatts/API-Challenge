var LolApi = require('leagueapi');

// MY KEY!! no stealerino
LolApi.init('0b569de1-9c38-4e8b-a802-a6032910689c', 'na');


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