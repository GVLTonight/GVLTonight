const fs = require('fs')
const _homeDir = require('os').homedir()

module.exports = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(_homeDir + '/keys', 'utf8', (err, data) => {
      if (err) {
        reject(err); return
      }
      let key = JSON.parse(data).mlab
      resolve(key)
    })
    console.log('LOG:\tRetrieved mlab key')
  })
}
