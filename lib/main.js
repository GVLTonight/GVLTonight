const fb_events = require('./fb_events.js');
const smileys = require('./smileys_events.js');
const currentEvents2Json = require('./currentEvents2Json.js');
const clog = console.log;
const mongodb = require('mongodb');
const fs = require('fs');
const home_dir = require('os').homedir();

let _fbEvents = [];
let _smileysEvents = [];
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
    return smileys(); //.then(x => {console.log(x.items.length)});
};

const _facebookData = function() {
    return fb_events();
};

const _getMLabKey = function(){
    return new Promise((resolve, reject) => {
        fs.readFile(home_dir + '/keys', 'utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }
            let key = JSON.parse(data).mlab;
            resolve(key);
        });
    });
}

Promise.all(
    [
        _facebookData(),
        _smileysData()
    ])
    .then(arr => {
        _fbEvents = arr[0];
        _smileysEvents = arr[1];
        currentEvents2Json(_events.concat(_fbEvents, _smileysEvents));
        return _events.concat(_fbEvents, _smileysEvents)
    })
    .then(events => {
        clog(events.length)

        _getMLabKey()
        .then(uri => {
            mongodb.MongoClient.connect(uri, function(err, db){
                if (err) throw err;

                for (var i = 0; i < events.length; i++){
                    let el = events[i];

                    let venueCol = db.collection(el.collection);
                    let allEvents = db.collection('events');

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
