
const request = require('request')
const moment = require('moment')
const startDate = moment().toISOString()
const endDate = moment().add(7, 'days').toISOString()

let venueUrl = 'http://www.smileysacousticcafe.com/calendar.php'
let shows = []

function getSmileysKey () {
  return new Promise((resolve, reject) => {
    let url = 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&src=smileysacousticcafe@gmail.com&color=%230D7813&ctz=America/New_York'
    request(url, (err, res, body) => {
      if (err) {
        reject(err); return
      }
      let key = res.body.match(/"developerKey":"(.+)"}/)[1]
      resolve(key)
    })
  })
}

function getSmileysData () {
  return new Promise((resolve, reject) => {
    getSmileysKey()
      .then(function (key) {
        let url = 'https://clients6.google.com/calendar/v3/calendars/smileysacousticcafe@gmail.com/events?calendarId=smileysacousticcafe@gmail.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=' + startDate + '&timeMax=' + endDate + '&key=' + key
        request(url, function (err, res, html) {
          if (err) {
            reject(err); return
          }
          const items = JSON.parse(res.body).items
          for (let i = 0; i < items.length; i++) {
            let _rawDate = items[i].start.dateTime
            let _rawTime = _rawDate.split('T')[1]
            let show = {
              collection: 'smileys',
              venue: 'Smileys Acoustic Cafe',
              venueUrl: venueUrl,
              title: items[i].summary,
              description: items[i].description,
              url: items[i].htmlLink,
              time: _rawTime.split('-')[0],
              date: _rawDate.split('T')[0],
              datetime: _rawDate
            }
            shows.push(show)
          }
          // require('./pushToDB')(shows, 'smileys')
          resolve(shows)
        })
      })
  })
}

module.exports = getSmileysData
