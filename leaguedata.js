/*
Makes an ajax call to the server for 'data' which includes
    champs
    items
    apItems
    summoner
    matches.before.ranked
    matches.after.ranked
*/
$.ajax({
    type: "GET",
    url: "http://localhost:3000/ajaxRequest",
    dataType: "json",
    data: {
        
    },
    //contentType: "application/json; charset=UTF-8",
    success: function(data) {
        updateItemNames(data.apItems);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.responseText);
        alert(textStatus);
    }
});

function updateItemNames(apItems) {
    $('.item-container.rylais span').get(0).textContent = 'hello';//apItems[0];
}