// Adds "Parameter days;" to current date
const
    request = require('request'),
    util = require('util'),
    clog = console.log;

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
            resolve(shows);
        });
    });
}

// getRadioRoomData();
module.exports = getRadioRoomData;