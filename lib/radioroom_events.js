const request = require('request');
const axios = require('axios');

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
                    date: raw_date.split('T')[0],
                    datetime: raw_date
                };
                shows.push(show);
            })
            // require('./pushToDB')(shows, 'radioroom');
            resolve(shows);
        });
    });
}

// getRadioRoomData();
module.exports = getRadioRoomData;