const { FB, FacebookApiException } = require('fb')
const moment = require('moment')
const fs = require('fs')
const clog = console.log
const _homeDir = require('os').homedir()

function getFacebookKey () {
  return new Promise((resolve, reject) => {
    fs.readFile(_homeDir + '/keys', 'utf8', (err, data) => {
      if (err) {
        reject(err); return
      }
      let key = JSON.parse(data).fb
      resolve(key)
    })
    clog('LOG:\tRetrieved Facebook key')
  })
}

// Determine what the collection name will be
// -- for the more common and popular venues
// -- give them their own collection
function collectionDeterminer (inputVenue) {
  if (inputVenue.toLowerCase().indexOf('radio room') !== -1) {
    return 'radioroom'
  } else if (inputVenue.toLowerCase().indexOf('gottrocks') !== -1) {
    return 'gottrocks'
  } else if (inputVenue.toLowerCase().indexOf('groundzero') !== -1) {
    return 'groundzero'
  } else if (inputVenue.toLowerCase().indexOf('smileys') !== -1) {
    return 'smileys'
  } else if (inputVenue.toLowerCase().indexOf('village') !== -1 || inputVenue.toLowerCase().indexOf('villive') !== -1) {
    return 'village'
  } else {
    return 'other'
  }
}

function getFacebookData () {
  return new Promise((resolve, reject) => {
    getFacebookKey().then(function (key) {
      let events = []
      FB.api('', 'post', {
        version: 'v2.8',
        access_token: key,
        batch: [
          { method: 'get', relative_url: '/GottRocksgvl/events' },
          { method: 'get', relative_url: '/groundzeroSC/events' },
          { method: 'get', relative_url: '/iongreenville/events' },
          { method: 'get', relative_url: '/villivemusic/events' },
          { method: 'get', relative_url: '/thevelofellowgvl/events' }
          // { method: 'get', relative_url: '/wpbrradioroom/events' },
          // { method: 'get', relative_url: '/smileysacousticcafe/events' },
        ]
      }, (response) => {
        if (!response || response.error) {
          reject(!response ? clog('error occurred') : clog(FacebookApiException, response.error)); return
        }
        // LOOP through each response from the FB.api({batch: []}) list.
        // -- At the lowest level, extract only the details from
        // -- each event that we'll want to use later on the site.
        for (let i = 0; i < response.length; i++) {
          // --
          // Convert the response's body.data from string to JSON
          // --
          let _currentItem = JSON.parse(response[i].body).data
          for (let k = 0; k < _currentItem.length; k++) {
            // --
            // If event is before todays date, skip
            // --
            if (moment(_currentItem[k].start_time).isSameOrAfter(moment())) {
              // --
              // Check if event has a venue value (some dont) (i think it's IPA)
              // --
              if (_currentItem[k].place) {
                let _rawTime = _currentItem[k].start_time.split('T')
                let event = {
                  collection: collectionDeterminer(_currentItem[k].place.name),
                  venue: _currentItem[k].place.name,
                  venueUrl: 'https://facebook.com/' + _currentItem[k].place.id,
                  title: _currentItem[k].name,
                  description: _currentItem[k].description,
                  url: 'https://facebook.com/' + _currentItem[k].id,
                  time: _rawTime[1].split('-')[0],
                  date: _rawTime[0],
                  datetime: _currentItem[k].start_time
                }
                // --
                // Push "Object event;" to "Array events;"
                // --
                events.push(event)
              }
            }
          }
        }
        resolve(events)
      })
    })
  })
}

// getFacebookData()
module.exports = getFacebookData

// peacecenter rss
// http://www.peacecenter.org/events/rss
