var dossier = require('../src/utils/dossier')

var argv = require('minimist')(process.argv.slice(2));
var arg = argv._[0];

if (arg) {
  if (arg == 'cola') {
    process.env.VARIANT = JSON.stringify(dossier.cola);
  } else if (arg == 'avl') {
    process.env.VARIANT = JSON.stringify(dossier.avl);
  } else {
    process.env.VARIANT = JSON.stringify(dossier.gvl);
  }
}

module.exports = process.env.VARIANT;
