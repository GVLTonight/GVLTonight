var fb_events = require('./fb_events.js');
var smileys = require('./smileys.js');
var clog = console.log;

var _fbEvents = [];
var _smileysEvents = [];

fb_events.fb_data(function(fb_event_data){
    _fbEvents.push(fb_event_data);
    clog(fb_event_data.venues.length);
    return _fbEvents;
});

smileys.get_smileys_data(function(smileys_event_data){
    _smileysEvents.push(smileys_event_data.items);
    clog(smileys_event_data.items.length)
    return _smileysEvents;
});
