const { FB, Facebook, FacebookApiException } = require('fb');
const moment = require('moment');
const fs = require('fs');
const clog = console.log;
const util = require('util');
const home_dir = require('os').homedir();

function getFacebookKey() {
    return new Promise((resolve, reject) => {
        fs.readFile(home_dir + '/keys', 'utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }
            let key = JSON.parse(data).fb;
            resolve(key);
        });
        clog('LOG:\tRetrieved Facebook key');
    });
}

// Determine what the collection name will be
// -- for the more common and popular venues
// -- give them their own collection
function collectionDeterminer(inputVenue) {
    if (inputVenue.toLowerCase().indexOf('radio room') != -1){
        return 'radioroom';
    } else if (inputVenue.toLowerCase().indexOf('gottrocks') != -1){
        return 'gottrocks';
    } else if (inputVenue.toLowerCase().indexOf('groundzero') != -1) {
        return 'groundzero';
    } else if (inputVenue.toLowerCase().indexOf('smileys') != -1) {
        return 'smileys';
    } else if (inputVenue.toLowerCase().indexOf('village') != -1 || inputVenue.toLowerCase().indexOf('villive') != -1) {
        return 'village';
    } else {
        return 'other';
    }
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
                    { method: 'get', relative_url: '/wpbrradioroom/events' },
                    { method: 'get', relative_url: '/iongreenville/events' },
                    { method: 'get', relative_url: '/villivemusic/events' },
                    { method: 'get', relative_url: '/thevelofellowgvl/events' }
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

                    // --
                    // Convert the response's body.data from string to JSON
                    // --
                    let current_item = JSON.parse(response[i].body).data;
                    for (let k = 0; k < current_item.length; k++) {
                        // --
                        // If event is before todays date, skip
                        // --
                        if (moment(current_item[k].start_time).isSameOrAfter(moment())) {
                            // --
                            // Check if event has a venue value (some dont) (i think it's IPA)
                            // --
                            if (current_item[k].place) {
                                let raw_time = current_item[k].start_time.split('T');
                                let event = {
                                    collection: collectionDeterminer(current_item[k].place.name),
                                    venue: current_item[k].place.name,
                                    venueUrl: 'https://facebook.com/' + current_item[k].place.id,
                                    title: current_item[k].name,
                                    description: current_item[k].description,
                                    url: 'https://facebook.com/' + current_item[k].id,
                                    time: raw_time[1],
                                    date: raw_time[0]
                                };
                                // --
                                // Push "Object event;" to "Array events;"
                                // --
                                events.push(event);
                            } else {
                                // clog('fb_events\ncurrent_item[k].place cannot be found\n' + util.inspect(current_item[k], false, null) + '\n' + 'https://facebook.com/' + current_item[k].id + '\n');
                                // clog('fb_events\n\"current_item[k].place\" cannot be found\n' + 'https://facebook.com/' + current_item[k].id + '\n');
                            }
                        }
                    }
                }
                resolve(events);
            });
        });
    })
}


// RESPONSE => V2 => REFACTOR => RETURNS A BROKE A** RESPONSE
// function getFacebookData() {
//     return new Promise((resolve, reject) => {
//         getFacebookKey().then(function (key) {
//             let events = [];
//             FB.api('', 'post', {
//                 version: 'v2.8',
//                 access_token: key,
//                 batch: [
//                     { method: 'get', relative_url: '/GottRocksgvl/events' },
//                     { method: 'get', relative_url: '/groundzeroSC/events' },
//                     { method: 'get', relative_url: '/wpbrradioroom/events' },
//                     { method: 'get', relative_url: '/iongreenville/events' },
//                     { method: 'get', relative_url: '/villivemusic/events' },
//                     { method: 'get', relative_url: '/thevelofellowgvl/events' }
//                     // { method: 'get', relative_url: '/smileysacousticcafe/events' },
//                 ]
//             }, (response) => {
//                 if (!response || response.error) {
//                     reject(!response ? clog('error occurred') : clog(response.error)); return;
//                 }
//                 // response.forEach(x => { events.concat(x.map(function(y) { return {}; }));
//                 response.forEach(x => {
//                     let current_item = JSON.parse(x.body).data;

//                     events.push(current_item.map(y => {
//                         let e = [];
//                         if (moment(y.start_time).isSameOrAfter(moment())) {
//                             if (y.place) {
//                                 let raw_time = y.start_time.split('T');
//                                 let event = {
//                                     collection: collectionDeterminer(y.place.name),
//                                     venue: y.place.name,
//                                     venueUrl: 'https://facebook.com/' + y.place.id,
//                                     title: y.name,
//                                     description: y.description,
//                                     url: 'https://facebook.com/' + y.id,
//                                     time: raw_time[1],
//                                     date: raw_time[0]
//                                 };
//                                 e.push(event);
//                             } else {
//                                 clog('else if (!y.place)');
//                                 return;
//                             }
//                         } else {
//                             clog('else if (!moment(etc))');
//                             return;
//                         }
//                         return e;
//                     }))
//                 })
//                 clog(events);
//                 resolve(events);
//             });
//         });
//     })
// }

// getFacebookData();
module.exports = getFacebookData;

// peacecenter rss
// http://www.peacecenter.org/events/rss
