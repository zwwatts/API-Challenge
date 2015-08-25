var LolApi = require('leagueapi');

// MY KEY!! no stealerino
LolApi.init('0b569de1-9c38-4e8b-a802-a6032910689c', 'na');

LolApi.Static.getChampionList(true, function(err, champs) {
            console.log(champs.data);
});

var currentSummoner;
LolApi.Summoner.getByName('Foe One Flame', function(err, summoner) {
    if(!err) {
        console.log(summoner);
        console.log(summoner.id);
        console.log(summoner.name);
        console.log(summoner.summonerLevel);
    }
});

//The wrapper also accepts promises:
LolApi.Summoner.getByName('bowling')
.then(function (summoner) {
    console.log(summoner);
});

if (currentSummoner) {
    console.log(currentSummoner.id);
    LolApi.getMatchHistory(currentSummoner.id, 'na', function(err, history) {
        if(!err) {
            console.log(history);
        }
    });
}