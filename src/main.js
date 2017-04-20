var fb_events = require('./fb_events-promise.js');
var smileys = require('./smileys-promise.js');
var clog = console.log;

var _fbEvents = [];
var _smileysEvents = [];

var _smileysData = function(){
    return smileys() //.then(x => {console.log(x.items.length)});
}

var _facebookData = function(){
    return fb_events();
}

Promise.all([_facebookData(), _smileysData()]).then(arr => {
    clog(arr);
});
