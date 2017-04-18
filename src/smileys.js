Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

const request = require('request'),
      util = require('util'),
      clog = console.log,
      date = new Date(),
      startDate = date.toISOString(),
      endDateBuffer = date.addDays(7),
      endDate = endDateBuffer.toISOString()
;

exports.get_smileys_data = function(done){
    getKey_and_init(function(result){
        done(result);
    })
}

var getKey_and_init = function(cb){
    let url = 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&src=smileysacousticcafe@gmail.com&color=%230D7813&ctz=America/New_York';
    // get smileys api key for client6.google.com
    request(url, function(error, response, html){
        if(!error){
            var key = response.body.match(/"developerKey":"(.+)"}/)[1];
            getSmileysData(cb, key);
        }
    });
}

var getSmileysData = function(done, key){
    let url = 'https://clients6.google.com/calendar/v3/calendars/smileysacousticcafe@gmail.com/events?calendarId=smileysacousticcafe@gmail.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=' + startDate + '&timeMax=' + endDate + '&key=' + key;
    request(url, function(error, response, html){
        if(!error){
            // console.log(response.body)
            return done(JSON.parse(response.body));
        }
    });
}
