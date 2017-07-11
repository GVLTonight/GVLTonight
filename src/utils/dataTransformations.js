import moment from 'moment'

// Converts a flat collection of documents into:
// -- { title: [array], title2: [array], etc: [etc] }
// ---- groupBySorter( {array}, {value in documents to convert into key, and sort by} )
export function groupBySorter (arr, property) {
  return arr.reduce(function (buffer, x) {
    if (!buffer[x[property]]) { buffer[x[property]] = [] }
    buffer[x[property]].push(x)
    return buffer
  }, {})
}

// Mutates values to be more human-readable friendly
export function accessorize (rebuiltObj) {
  rebuiltObj.forEach(topLevObj => {
    topLevObj.data.map(innerObj => {
      if (moment(innerObj.datetime).format(('YYYY-MM-DD')) === moment().format(('YYYY-MM-DD'))) {
        innerObj.isToday = true
        innerObj.timeofday = innerObj.datetime.split('T')[1] > '18:00:00' ? 'TONIGHT' : 'TODAY'
      }
      innerObj.date = moment(innerObj.datetime).format('ddd MM/DD/YYYY')
      innerObj.time = moment(innerObj.datetime).format('h:mm A')
    })
  })
}

// Adds useful values =>
// -- { collectionName: { header: 'string', url: 'string', sortOrder: Number, data: [ Array ] } }
export function rebuild (rebuiltObj, param) {
  let bufferArray = []
  for (let x in rebuiltObj[param]) {
    let _el = rebuiltObj[param][x]
    let _venueName = _el[0].groupBy === 'other' ? _venueName = 'other' : _venueName = _el[0].venue.name
    bufferArray.push({
      header: _venueName.toLowerCase(),
      url: _el[0].venue.url,
      sortOrder: _el[0].sortOrder,
      temporaryId: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
      data: rebuiltObj[param][x].sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime)
      })
    })
  }
  return bufferArray
}
