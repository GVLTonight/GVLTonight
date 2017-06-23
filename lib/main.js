#!/usr/bin/env node
const _fbEvents = require('./fb_events.js')
const _smileysEvents = require('./smileys_events.js')
const _radioroomEvents = require('./radioroom_events.js')
const getKey = require('./getKey.js')
const clog = console.log
const mongodb = require('mongodb')
const moment = require('moment')

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
            colArr.push(el.sortBy)
            let allEvents = db.collection('eventstesting')
            allEvents.update(
              {
                title: el.title,
                date: el.date
              },
              {
                sortBy: el.sortBy,
                sortOrder: el.sortOrder,
                venue: {
                  name: el.venue.name,
                  url: el.venue.url,
                  latitude: el.venue.latitude,
                  longitude: el.venue.longitude,
                  country: el.venue.country,
                  city: el.venue.city,
                  state: el.venue.state,
                  street: el.venue.street,
                  zip: el.venue.zip
                },
                title: el.title,
                description: el.description,
                url: el.url,
                time: el.time,
                date: el.date,
                datetime: el.datetime,
                updated: moment().toISOString()
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
