const request = require('request')

let venueUrl = 'http://www.radioroomgreenville.com/'
let shows = []

function getRadioRoomData () {
  return new Promise((resolve, reject) => {
    let url = 'https://rest.bandsintown.com/artists/theradioroom/events/?app_id=gvltonight'
    request(url, function (err, res, html) {
      if (err) {
        reject(err); return
      }
      const items = JSON.parse(res.body)
      items.forEach(item => {
        let _rawDate = item.datetime
        let show = {
          collection: 'radioroom',
          venue: 'The Radio Room',
          venueUrl: venueUrl,
          title: item.venue.name,
          description: undefined,
          url: item.url,
          time: _rawDate.split('T')[1],
          date: _rawDate.split('T')[0],
          datetime: _rawDate
        }
        shows.push(show)
      })
      // require('./pushToDB')(shows, 'radioroom')
      resolve(shows)
    })
  })
}

// getRadioRoomData()
module.exports = getRadioRoomData
