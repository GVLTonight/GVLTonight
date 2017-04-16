var {FB, Facebook, FacebookApiException} = require('fb');
var fb = new Facebook();
var moment = require('moment');
var fs = require('fs');
var clog = console.log;

exports.fb_data = function(done){
    getKey_and_init(function(result){
        done(result);
    })
}

var getKey_and_init = function(cb){
    fs.readFile(__dirname + '/keys', 'utf8', (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);        
        getFBData(cb, parsed.fb);
    });
}

var getFBData = function(done, key){

    // var venues = {
    //     'gottrocks': { 
    //         'events': [] 
    //     },
    //     'smileys': {
    //         'events': []
    //     },
    //     'groundzero': {
    //         'events': []
    //     },
    //     'ipagreenville': {
    //         'events': []
    //     }
    // };

    var venues = {
        'venues': [
            {
                'name': 'gottrocks',
                'events': []
            },
            {
                'name': 'smileys',
                'events': []
            },
            {
                'name': 'groundzero',
                'events': []
            },
            {
                'name': 'ipagreenville',
                'events': []
            }
        ]
    }

    FB.api('', 'post', {
        version: 'v2.8',
        access_token: key,
        batch: [
            { method: 'get', relative_url: '/GottRocksgvl/events' },
            { method: 'get', relative_url: '/smileysacousticcafe/events' },
            { method: 'get', relative_url: '/groundzeroSC/events' },
            { method: 'get', relative_url: '/ipagreenville/events' },
        ]
    }, function(response) {

        if(!response || response.error) {
            console.log(!response ? 'error occurred' : response.error);
            return;
        }

        var gottrocks = JSON.parse(response[0].body).data;
        var smileys = JSON.parse(response[1].body).data;
        var groundzero = JSON.parse(response[2].body).data;
        var ipagreenville = JSON.parse(response[3].body).data;

        for(let i = 0; i < JSON.parse(response).length; i++){
            console.log(JSON.parse(response[i]))
        }
        // for(let i = 0; i < gottrocks.length; i++){
        //     let event = gottrocks[i];
        //     if (moment(event.start_time).isSameOrAfter(moment())){
        //         venues.gottrocks.events.push(event);
        //     }
        // }  

        // for(let i = 0; i < gottrocks.length; i++){
        //     let event = gottrocks[i];
        //     if (moment(event.start_time).isSameOrAfter(moment())){
        //         venues.gottrocks.events.push(event);
        //     }
        // }

        // for(let i = 0; i < smileys.length; i++){
        //     let event = smileys[i];
        //     if (moment(event.start_time).isSameOrAfter(moment())){
        //         venues.smileys.events.push(event);
        //     }
        // }

        // for(let i = 0; i < groundzero.length; i++){
        //     let event = groundzero[i];
        //     if (moment(event.start_time).isSameOrAfter(moment())){
        //         venues.groundzero.events.push(event);
        //     }
        // }

        // for(let i = 0; i < ipagreenville.length; i++){
        //     let event = ipagreenville[i];
        //     if (moment(event.start_time).isSameOrAfter(moment())){
        //         venues.ipagreenville.events.push(event);
        //     }
        // }

        // console.log(venues);
        return done(venues);
    });
}

// module.exports = "getFBData";

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