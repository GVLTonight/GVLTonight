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
                    { method: 'get', relative_url: '/smileysacousticcafe/events' },
                    { method: 'get', relative_url: '/groundzeroSC/events' },
                    { method: 'get', relative_url: '/ipagreenville/events' }
                ]
            }, (response) => {
                if (!response || response.error) {
                    reject(!response ? clog('error occurred') : clog(response.error)); return;
                }

                // THIRD WORKING MODEL
                for (let i = 0; i < response.length; i++) {
                    let current_item = JSON.parse(response[i].body).data;
                    for (let k = 0; k < current_item.length; k++) {
                        // clog(current_item[k]);
                        if (moment(current_item[k].start_time).isSameOrAfter(moment())) {
                            // locations.venues[i].events.push(current_item[k]);
                            // events.push(moment(current_item[k].start_time));
                            // events.push({'test': current_item[k]});
                            // if (current_item[k].place.name !== undefined) {
                            //     let raw_time = current_item[k].start_time.split('T');
                            //     let event = {
                            //         venue: current_item[k].place.name,
                            //         venueUrl: 'https://facebook.com/' + current_item[k].place.id,
                            //         title: current_item[k].title,
                            //         url: 'https://facebook.com/' + current_item[k].id,
                            //         time: raw_time[1],
                            //         date: raw_time[0]
                            //     };

                            //     clog(event);
                            //     events.push(event);
                            // } else {
                            //     clog('error');
                            // }
                            events.push(JSON.stringify(current_item[k]));
                        }
                    }
                }

                // console.log(util.inspect(locations, false, null));

                resolve(events);
            });
        });
    });
}

module.exports = getFacebookData;

// exports.fb_data = function(done){
//     getKey_and_init(function(result){
//         done(result);
//     })
// }

// var getKey_and_init = function(cb){
//     fs.readFile(__dirname + '/keys', 'utf8', (err, data) => {
//         if (err) throw err;
//         var parsed = JSON.parse(data);
//         getFBData(cb, parsed.fb);
//     });
// }

// var getFBData = function(done, key){
//     var locations = {
//         'venues': [
//             {
//                 'name': 'gottrocks',
//                 'events': []
//             },
//             {
//                 'name': 'smileys',
//                 'events': []
//             },
//             {
//                 'name': 'groundzero',
//                 'events': []
//             },
//             {
//                 'name': 'ipagreenville',
//                 'events': []
//             }
//         ]
//     }

//     FB.api('', 'post', {
//         version: 'v2.8',
//         access_token: key,
//         batch: [
//             { method: 'get', relative_url: '/GottRocksgvl/events' },
//             { method: 'get', relative_url: '/smileysacousticcafe/events' },
//             { method: 'get', relative_url: '/groundzeroSC/events' },
//             { method: 'get', relative_url: '/ipagreenville/events' },
//         ]
//     }, function(response) {

//         if(!response || response.error) {
//             console.log(!response ? 'error occurred' : response.error);
//             return;
//         }

//         // THIRD WORKING MODEL
//         for(let i = 0; i < response.length; i++){
//             let current_item = JSON.parse(response[i].body).data;
//             for (let k = 0; k < current_item.length; k++){
//                 if (moment(current_item[k].start_time).isSameOrAfter(moment())){
//                     locations.venues[i].events.push(current_item[k]);
//                 }
//             }
//         }

//         // console.log(util.inspect(locations, false, null))

//         return done(locations);
//     });
// };



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

// FB.setAccessToken('1468614206500622|HM8RF9EDSI7qEcQ_SdIPjZuU-hE');

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

// long lived access token
// {"access_token": "EAAU3smQXLw4BAEJelFEVTbrJ5l40s1l1Pm92dPDlPEwnNgYyUHLDTrgV9PvFFxZBBqHhrjBVLRdhbVMdQ8DJvxFZA1dGMstEQ29d9EwmnFrAIsyXoV5OzGgfsvtzd1hVGDV1SBLZAInIEIm8Te8","token_type": "bearer","expires_in": 5184000}

// permanent access token
// {"data":[{"access_token":"EAAU3smQXLw4BALyihkffnEP71aJeH6J4gaWaqQcdJZB6vk6Hf7Em9WYcgMvNCcrcWehZCzYZAgLSPAubsIM7oaBV2iVzMcXXkTRTjxOmxL7eJF9efKoQVlbgRIxiBvtcDihGwBTi9nrpru3ZBHXdXlm2HAeD8J1piGDDqhYzZAOMMGyurdxSPXZA4xedIYSDAZD","category":"Media/News Company","name":"Untitled Zine","id":"350099195045356","perms":["ADMINISTER","EDIT_PROFILE","CREATE_CONTENT","MODERATE_CONTENT","CREATE_ADS","BASIC_ADMIN"]}],"paging":{"cursors":{"before":"MzUwMDk5MTk1MDQ1MzU2","after":"MzUwMDk5MTk1MDQ1MzU2"}}}

// peacecenter rss
// http://www.peacecenter.org/events/rss
