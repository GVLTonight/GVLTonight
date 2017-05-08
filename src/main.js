const fb_events = require('./fb_events-promise.js');
const smileys = require('./smileys-promise.js');
const clog = console.log;
const util = require('util');

let _fbEvents = [];
let _smileysEvents = [];

let _smileysData = function() {
    return smileys(); //.then(x => {console.log(x.items.length)});
};

const _facebookData = function() {
    return fb_events();
};

Promise.all(
    [
        _facebookData()
        // _smileysData()
    ])
    .then(arr => {
        // clog(arr);
        console.log(JSON.parse(util.inspect(arr, false, null)));
    }
);
