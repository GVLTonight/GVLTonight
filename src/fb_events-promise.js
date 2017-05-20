const { FB, Facebook, FacebookApiException } = require('fb');
const fb = new Facebook();
const moment = require('moment');
const fs = require('fs');
const clog = console.log;
const util = require('util');

function getFacebookKey() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/keys', 'utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }
            let key = JSON.parse(data).fb;
            resolve(key);
        });
    });
}

function getFacebookData() {
    return new Promise((resolve, reject) => {
        getFacebookKey().then(function (key) {
            let events = [];
            FB.api('', 'post', {
                version: 'v2.8',
                access_token: key,
                batch: [
                    { method: 'get', relative_url: '/GottRocksgvl/events' },
                    { method: 'get', relative_url: '/groundzeroSC/events' },
                    { method: 'get', relative_url: '/ipagreenville/events' },
                    { method: 'get', relative_url: '/wpbrradioroom/events' }
                    // { method: 'get', relative_url: '/smileysacousticcafe/events' },
                ]
            }, (response) => {
                if (!response || response.error) {
                    reject(!response ? clog('error occurred') : clog(response.error)); return;
                }
                // LOOP through each response from the FB.api({batch: []}) list.
                // -- At the lowest level, extract only the details from
                // -- each event that we'll want to use later on the site.
                for (let i = 0; i < response.length; i++) {
                    let current_item = JSON.parse(response[i].body).data;                   // Convert the response's body.data from string to JSON
                    for (let k = 0; k < current_item.length; k++) {
                        if (moment(current_item[k].start_time).isSameOrAfter(moment())) {   // If event is before todays date, skip
                            if (current_item[k].place) {                                    // Check if event has a venue value (some dont) (i think it's IPA)
                                let raw_time = current_item[k].start_time.split('T');
                                let event = {
                                    venue: current_item[k].place.name,
                                    venueUrl: 'https://facebook.com/' + current_item[k].place.id,
                                    title: current_item[k].name,
                                    description: current_item[k].description,
                                    url: 'https://facebook.com/' + current_item[k].id,
                                    time: raw_time[1],
                                    date: raw_time[0]
                                };
                                events.push(event);                                         // Push "Object event;" to "Array events;"
                            } else {
                                console.log('FBEvents\ncurrent_item[k].place cannot be found\n' + util.inspect(current_item[k], false, null) + '\n');
                            }
                        }
                    }
                }
                // console.log(events)
                resolve(events);
            });
        });
    });
}

// getFacebookData();
module.exports = getFacebookData;

// -----------------------------------------
// NOTES
// -----------------------------------------

// FB.setAccessToken(function(){
//     fs.readFile(__dirname + '/keys', 'utf8', (err, data) => {
//         if (err) throw err;
//         var parsed = JSON.parse(data);
//         return parsed.fb;
//     });
// });

// FB.setAccessToken('see KEYS file');

// FB.api(
//     '/GottRocksgvl/events',
//     function(response) {
//         if (response.error) {
//             console.log(response.error);
//         } else
//         if (response && !response.error) {
//             // handle the result
//             for(let i = 0; i < response.data.length; i++){
//     //                 let event = response.data[i];
//                 if (event.start_time){
//                     events.push(event);
//                 }
//             }
//         }
//     }
// );

// peacecenter rss
// http://www.peacecenter.org/events/rss
