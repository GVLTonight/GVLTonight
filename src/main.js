var fb_events = require('./fb_events.js');
var smileys = require('./smileys.js');
var clog = console.log;

var _fbEvents = [];
var _smileysEvents = [];

// fb_events.fb_data(function(fb_event_data){
//     _fbEvents.push(fb_event_data);
//     clog(fb_event_data.venues.length);
//     return _fbEvents;
// });

// smileys.get_smileys_data(function(smileys_event_data){
//     _smileysEvents.push(smileys_event_data.items);
//     clog(smileys_event_data.items.length)
//     return _smileysEvents;
// });

var _smileysData = function(){
    return smileys() //.then(x => {console.log(x.items.length)});
}

var _facebookData = function(){
    var idk = {"hi": "idk"};
    return idk;
}

Promise.all([_facebookData(), _smileysData()]).then(arr => {
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (i === 1){
            for (var k = 0;k < element.items.length; k++) {
                clog(arr[i].items[k].summary)
            }
        }
    }
});
