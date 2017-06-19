const fs = require('fs')
// const _homeDir = require('os').homedir()
const os = require('os')

module.exports = function () {
  return new Promise((resolve, reject) => {
    let _homeDir
    if (os.type === 'Linux') {
      _homeDir = '/home/kb'
    } else {
      _homeDir = os.homedir()
    }
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
