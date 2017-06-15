const clog = console.log;
const mongodb = require('mongodb');
const getMLabKey = require('./getMLabKey');

module.exports = function(eventArr, col_name){
    getMLabKey()
    .then(uri => {
        mongodb.MongoClient.connect(uri, function(err, db){
            if (err) throw err;
            clog('LOG:\tConnection to ' + col_name.toUpperCase() + ' mlab opened')

            eventArr.forEach(el => {
                let colName = db.collection(col_name);
                colName.update(
                    {
                        title: el.title,
                        date: el.date
                    },
                    {
                        collection: el.collection,
                        venue: el.venue,
                        venueUrl: el.venueUrl,
                        title: el.title,
                        description: el.description,
                        url: el.url,
                        time: el.time,
                        date: el.date
                    },
                    {
                        upsert: true
                    }
                )
            })

            db.close(function (err) {
                if(err) throw err;
                clog('LOG:\tConnection to ' + col_name.toUpperCase() + ' mlab closed')
            });
        })
    })
}