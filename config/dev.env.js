var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var dossier = require('./dossier.conf.js')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VARIANT: dossier
})
