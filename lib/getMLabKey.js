const fs = require('fs')
// const _homeDir = require('os').homedir()
const os = require('os')

module.exports = function () {
  return new Promise((resolve, reject) => {
    if (os.type === 'Linux') {
      keysPath = '/home/kb/keys'
    } else {
      keysPath = os.homedir() + '/keys'
    }
    fs.readFile(keysPath, 'utf8', (err, data) => {
      if (err) {
        reject(err); return
      }
      let key = JSON.parse(data).mlab
      resolve(key)
    })
    console.log('LOG:\tRetrieved mlab key')
  })
}
