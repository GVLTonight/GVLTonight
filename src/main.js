const fb_events = require('./fb_events-promise.js');
const smileys = require('./smileys-promise.js');
const clog = console.log;
const util = require('util');

let _fbEvents = [];
let _smileysEvents = [];
let _events;

const _smileysData = function() {
    return smileys(); //.then(x => {console.log(x.items.length)});
};

const _facebookData = function() {
    return fb_events();
};

Promise.all(
    [
        _facebookData(),
        _smileysData()
    ])
    .then(arr => {
        _fbEvents = arr[0];
        _smileysEvents = arr[1];
        return _fbEvents.concat(_smileysEvents);
    })
    .then(events => {
        clog(events.length)
    }
);

// FOR MERGING JS/JSON
// DEEP-EXTEND: https://github.com/unclechu/node-deep-extend
// DEEPMERGE: https://www.npmjs.com/package/deepmerge

// FROM THE INTERNET
// MERGE(Array, Array, String ["key to merge, as starting point"])
// http://stackoverflow.com/a/41919138/3864870
// -----------------
// Example
// merge(_fbEvents, _smileysEvents, 'title');
function merge(a, b, prop){
    var reduced = a.filter(function(aitem){
        return ! b.find(function(bitem){
            if((aitem[prop] === bitem[prop]) === true){
                clog(aitem, bitem)
            }
            return aitem[prop] === bitem[prop];
        });
    });
    return reduced.concat(b);
}

// ES6 Verions
function mergeArrow(a, b, prop){
    var reduced =  a.filter( aitem => ! b.find ( bitem => aitem[prop] === bitem[prop]) )
    return reduced.concat(b);
}