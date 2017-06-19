const fs = require('fs')

module.exports = function (input) {
  return new Promise((resolve, reject) => {
    fs.readFile('./keys', 'utf8', (err, data) => {
      if (err) {
        reject(err); return
      }
      let key = JSON.parse(data)[input]
      resolve(key)
    })
    console.log('LOG:\tRetrieved ' + input + ' key')
  })
}
