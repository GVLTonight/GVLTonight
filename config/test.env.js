var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var dossier = require('./dossier.conf')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  VARIANT: dossier
})
