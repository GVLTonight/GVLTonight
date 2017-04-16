var moment = require('moment');
var fs = require('fs');
var clog = console.log;

module.exports = function(done){
    getKey(function(result){
        done(result);
    });
}

var getKey = function(cb){
    fs.readFile(__dirname + '/keys', 'utf8', (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);        
        getFBData(cb, parsed.fb);
    });
}