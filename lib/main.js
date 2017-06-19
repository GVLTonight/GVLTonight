#!/usr/bin/env node
const _fbEvents = require('./fb_events.js')
const _smileysEvents = require('./smileys_events.js')
const _radioroomEvents = require('./radioroom_events.js')
const getKey = require('./getKey.js')
const clog = console.log
const mongodb = require('mongodb')

let _events = []

const _smileysData = function () { return _smileysEvents() }
const _facebookData = function () { return _fbEvents() }
const _radioroomData = function () { return _radioroomEvents() }

Promise.all(
  [
    _facebookData(),
    _smileysData(),
    _radioroomData()
  ])
  .then(arr => {
    // --
    // use Array Spread syntax to concat arr array
    // --
    return _events.concat(...arr)
  })
  .then(events => {
    clog('LOG:\tFound ' + events.length + ' events.')

    getKey('mlab')
      .then(uri => {
        mongodb.MongoClient.connect(uri, function (err, db) {
          if (err) throw err
          clog('LOG:\tConnection to ALLEVENTS mlab opened')
          let colArr = ['events']

          events.forEach(el => {
            colArr.push(el.collection)
            let allEvents = db.collection('events')
            allEvents.update(
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
                date: el.date,
                datetime: el.datetime
              },
              {
                upsert: true
              }
            )
          })

          db.close(function (err) {
            if (err) throw err
            clog('LOG:\tMongo Collections: ' + [...new Set(colArr)].toString())
            clog('LOG:\tConnection to ALLEVENTS mlab closed')
          })
        })
      }
    )
  }
)
