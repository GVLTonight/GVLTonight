// Adds "Parameter days;" to current date
Date.prototype.addDays = function(days) {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() + days);
    return d;
}

const request = require('request');
const date = new Date();
const startDate = date.toISOString();
const endDateBuffer = date.addDays(7);
const endDate = endDateBuffer.toISOString();

let venueUrl = 'http://www.smileysacousticcafe.com/calendar.php';
let shows = [];

function getSmileysKey () {
    return new Promise((resolve, reject) => {
        let url = 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&src=smileysacousticcafe@gmail.com&color=%230D7813&ctz=America/New_York';
        request(url, (err, res, body) => {
            if (err) {
                reject(err); return;
            }
            let key = res.body.match(/"developerKey":"(.+)"}/)[1];
            resolve(key);
        });
    });
}

function getSmileysData () {
    return new Promise((resolve, reject) => {
        let key = getSmileysKey()
        .then(function(key){
            let url = 'https://clients6.google.com/calendar/v3/calendars/smileysacousticcafe@gmail.com/events?calendarId=smileysacousticcafe@gmail.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=' + startDate + '&timeMax=' + endDate + '&key=' + key;
            request(url, function(err, res, html){
                if (err) {
                    reject(err); return;
                }
                const items = JSON.parse(res.body).items;
                for (let i = 0; i < items.length; i++) {
                    let raw_date = items[i].start.dateTime;
                    let raw_time = raw_date.split('T')[1];
                    let show = {
                        collection: 'smileys',
                        venue: 'Smileys Acoustic Cafe',
                        venueUrl: venueUrl,
                        title: items[i].summary,
                        description: items[i].description,
                        url: items[i].htmlLink,
                        time: raw_time.split('-')[0],
                        date: raw_date.split('T')[0],
                        datetime: raw_date
                    };
                    shows.push(show);
                }
                // require('./pushToDB')(shows, 'smileys');
                resolve(shows);
            });
        });
    });
}

module.exports = getSmileysData;