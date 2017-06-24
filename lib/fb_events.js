const { FB, FacebookApiException } = require('fb')
const moment = require('moment')
const getKey = require('./getKey.js')
const clog = console.log

// Determine what the collection name will be for the more common and popular venues
// -- put them in the correct sortBy bucket
// -- also give them a sort number at array index
// ---- sortDeterminer('string')
// ------ // => ['string', Number]
function sortDeterminer (inputVenue) {
  if (inputVenue.toLowerCase().indexOf('radio room') !== -1) {
    return ['radioroom', 1]
  } else if (inputVenue.toLowerCase().indexOf('gottrocks') !== -1) {
    return ['gottrocks', 2]
  } else if (inputVenue.toLowerCase().indexOf('smileys') !== -1) {
    return ['smileys', 3]
  } else if (inputVenue.toLowerCase().indexOf('groundzero') !== -1) {
    return ['groundzero', 4]
  } else {
    return ['other', 5]
  }
}

function getFacebookData () {
  return new Promise((resolve, reject) => {
    getKey('fb').then(function (key) {
      let events = []
      let skipCounter = 0
      let todaysDate = moment().format('YYYY-MM-DD')
      let nextWeek = moment().add(7, 'days').format('YYYY-MM-DD')
      FB.api('', 'post', {
        version: 'v2.8',
        access_token: key,
        batch: [
          { method: 'get', relative_url: '/GottRocksgvl/events' },
          { method: 'get', relative_url: '/thevelofellowgvl/events' },
          { method: 'get', relative_url: '/groundzeroSC/events' },
          { method: 'get', relative_url: '/iongreenville/events?since=' + todaysDate + '&until=' + nextWeek },
          { method: 'get', relative_url: '/villivemusic/events' }
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
          // console.log(_currentItem[0])
          for (let k = 0; k < _currentItem.length; k++) {
            // --
            // If event is before todays date, skip
            // --
            if (moment(_currentItem[k].start_time).isSameOrAfter(moment())) {
              // --
              // Check if event has a venue value (some dont) (i think it's IPA)
              // --
              if (_currentItem[k].place && _currentItem[k].place.location) {
                let _rawTime = _currentItem[k].start_time.split('T')
                let event = {
                  sortBy: sortDeterminer(_currentItem[k].place.name)[0],
                  sortOrder: sortDeterminer(_currentItem[k].place.name)[1],
                  venue: {
                    name: _currentItem[k].place.name,
                    url: 'https://facebook.com/' + _currentItem[k].place.id,
                    latitude: _currentItem[k].place.location.latitude,
                    longitude: _currentItem[k].place.location.longitude,
                    country: _currentItem[k].place.location.country,
                    city: _currentItem[k].place.location.city,
                    state: _currentItem[k].place.location.state,
                    street: _currentItem[k].place.location.street,
                    zip: _currentItem[k].place.location.zip
                  },
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
              } else {
                skipCounter = skipCounter += 1
              }
            }
          }
        }
        clog('LOG:\t' + 'Skipped ' + skipCounter + ' FB events.')
        resolve(events)
      })
    })
  })
}

// getFacebookData()
module.exports = getFacebookData

// peacecenter rss
// http://www.peacecenter.org/events/rss
