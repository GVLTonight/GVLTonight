const request = require('request');
const util = require('util');
const clog = console.log;
const mongodb = require('mongodb');
const getMLabKey = require('./getMLabKey');

let venueUrl = 'http://www.radioroomgreenville.com/';
let shows = [];

function getRadioRoomData () {
    return new Promise((resolve, reject) => {
        let url = 'https://rest.bandsintown.com/artists/theradioroom/events/?app_id=gvltonight';
        request(url, function(err, res, html){
            if (err) {
                reject(err); return;
            }
            const items = JSON.parse(res.body);
            items.forEach(item => {
                let raw_date = item.datetime;
                let show = {
                    collection: 'radioroom',
                    venue: 'The Radio Room',
                    venueUrl: venueUrl,
                    title: item.venue.name,
                    description: undefined,
                    url: item.url,
                    time: raw_date.split('T')[1],
                    date: raw_date.split('T')[0]
                };
                shows.push(show);
            })
            pushToDB(shows);
            resolve(shows);
        });
    });
}

function pushToDB(input){
    getMLabKey()
    .then(uri => {
        mongodb.MongoClient.connect(uri, function(err, db){
            if (err) throw err;
            clog('LOG:\tConnection to RADIOROOM mlab opened')

            input.forEach(el => {
                let radioroom = db.collection('radioroom');
                radioroom.update(
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
            })

            db.close(function (err) {
                if(err) throw err;
                clog('LOG:\tConnection to RADIOROOM mlab closed')
            });
        })
    })
}

// getRadioRoomData();
module.exports = getRadioRoomData;