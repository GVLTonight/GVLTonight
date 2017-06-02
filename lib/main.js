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

const sampleEvent_birthday = {
    venue: 'Kevs cool venue',
    venueUrl: 'kevscoolurl.co.uk',
    title: 'my birthday',
    description: 'this very cool event is happening',
    url: 'omgcool.com',
    time: '22:00:00',
    date: '2017-06-02'
}

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
        events.push(sampleEvent_birthday)

        // // VERSION 3
        _getMLabKey()
        .then(uri => {
            mongodb.MongoClient.connect(uri, function(err, db){
                if (err) throw err;
                for (var i = 0; i < events.length; i++) {
                    let el = events[i];
                    let eventsDay = db.collection(el.date);

                    eventsDay.update(
                        {
                            title: el.title,
                            date: el.date
                        },
                        {
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
