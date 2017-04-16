var fb_events = require('./fb_events.js');

var events;

fb_events.fb_data(function(fb_event_data){
    // console.log(input)
    return test(fb_event_data);
})

function test(input){
    events = input;
    console.log(events.length);
}

