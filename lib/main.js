const fb_events = require('./fb_events.js');
const smileys_events = require('./smileys_events.js');
const radioroom_events = require('./radioroom_events.js');
const currentEvents2Json = require('./currentEvents2Json.js');
const clog = console.log;
const mongodb = require('mongodb');
const fs = require('fs');
const getMLabKey = require('./getMLabKey');

let _fbEvents = [];
let _smileysEvents = [];
let _radioroomEvents = [];
let _events = [];

const venueList = [
    'gottrocks',
    'groundzero',
    'ipa',
    'radioroom',
    'villive',
    'iongreenville',
    'smileys'
];

const _smileysData = function() {
    return smileys_events(); //.then(x => {console.log(x.items.length)});
};

const _facebookData = function() {
    return fb_events();
};

const _radioroomData = function() {
    return radioroom_events();
};

Promise.all(
    [
        _facebookData(),
        _smileysData(),
        _radioroomData()
    ])
    .then(arr => {
        _fbEvents = arr[0];
        _smileysEvents = arr[1];
        _radioroomEvents = arr[2];
        currentEvents2Json(_events.concat(_fbEvents, _smileysEvents, _radioroomEvents));
        return _events.concat(_fbEvents, _smileysEvents, _radioroomEvents);
    })
    .then(events => {
        clog(events.length)

        getMLabKey()
        .then(uri => {
            mongodb.MongoClient.connect(uri, function(err, db){
                if (err) throw err;

                for (var i = 0; i < events.length; i++){
                    let el = events[i];

                    let venueCol = db.collection(el.collection);
                    let allEvents = db.collection('events');
                    let radioroom = db.collection('radioroom');

                    venueCol.update(
                        {
                            title: el.title,
                            date: el.date
                        },
                        {
                            collection: el.collection,
                            venue: el.venue,
                            venueUrl: el.venueUrl,
                            title: el.title,
                            description: el.description,
                            url: el.url,
                            time: el.time,
                            date: el.date
                        },
                        {
                            upsert: true
                        }
                    )

                    allEvents.update(
                        {
                            title: el.title,
                            date: el.date
                        },
                        {
                            collection: el.collection,
                            venue: el.venue,
                            venueUrl: el.venueUrl,
                            title: el.title,
                            description: el.description,
                            url: el.url,
                            time: el.time,
                            date: el.date
                        },
                        {
                            upsert: true
                        }
                    )
                }

                db.close(function (err) {
                    if(err) throw err;
                });
            })
        })
    }
);
