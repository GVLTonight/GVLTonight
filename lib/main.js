const fb_events = require('./fb_events.js');
const smileys_events = require('./smileys_events.js');
const radioroom_events = require('./radioroom_events.js');
const currentEvents2Json = require('./currentEvents2Json.js');
const clog = console.log;
const mongodb = require('mongodb');
const fs = require('fs');
const getMLabKey = require('./getMLabKey');

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
        // --
        // use Array Spread syntax to concat arr array;
        // --
        currentEvents2Json(_events.concat(...arr));
        return _events.concat(...arr);
    })
    .then(events => {
        clog('LOG:\tFound ' + events.length + ' events.')

        getMLabKey()
        .then(uri => {
            mongodb.MongoClient.connect(uri, function(err, db){
                if (err) throw err;
                clog('LOG:\tConnection to ALLEVENTS mlab opened')
                let colArr = ['events'];

                events.forEach(el => {
                    colArr.push(el.collection);
                    let allEvents = db.collection('events');
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
                            date: el.date,
                            datetime: el.datetime
                        },
                        {
                            upsert: true
                        }
                    )
                })

                db.close(function (err) {
                    if(err) throw err;
                    clog('LOG:\tMongo Collections: ' + [ ...new Set(colArr) ].toString());
                    clog('LOG:\tConnection to ALLEVENTS mlab closed')
                });
            })
        })
    }
);
