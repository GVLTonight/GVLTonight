var dossier = require('../src/utils/dossier')

var keys = Object.keys(dossier)
var argv = require('yargs')
  .usage('Usage: npm run (script) -- --city=[' + [...keys] + ']')
  .argv;

if (typeof argv.city !== 'boolean') {
  if (argv.city == 'cola') {
    process.env.VARIANT = JSON.stringify(dossier.cola);
  } else if (argv.city == 'avl') {
    process.env.VARIANT = JSON.stringify(dossier.avl);
  } else if (argv.city == 'gvl'){
    process.env.VARIANT = JSON.stringify(dossier.gvl);
  } else if (argv.city == 'clt'){
    process.env.VARIANT = JSON.stringify(dossier.clt);
  }
}

module.exports = process.env.VARIANT;
