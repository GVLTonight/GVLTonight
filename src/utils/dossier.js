const moment = require('moment')

let tomorrow = moment().add(1, 'day').format('YYYY-MM-DD')
let endOfWeek = moment().add(7, 'day').format('YYYY-MM-DD')

module.exports = {
  gvl: {
    name: 'gvltonight',
    city: 'greenville',
    state: 'sc',
    title: 'GVLTONIGHT: live music aggregator for greenville sc',
    ajax: [
      `https://api.gvltonight.com/v1/gvl/tonight`,
      `https://api.gvltonight.com/v1/gvl/events/${tomorrow}/${endOfWeek}`
    ]
  },
  cola: {
    name: 'colatonight',
    city: 'columbia',
    state: 'sc',
    title: 'COLATONIGHT: live music aggregator for columbia sc',
    ajax: [
      `https://api.colatonight.com/v1/cola/tonight`,
      `https://api.colatonight.com/v1/cola/events/${tomorrow}/${endOfWeek}`
    ]
  },
  avl: {
    name: 'avltonight',
    city: 'asheville',
    state: 'nc',
    title: 'AVLTONIGHT: live music aggregator for asheville nc',
    ajax: [
      `https://api.avltonight.com/v1/avl/tonight`,
      `https://api.avltonight.com/v1/avl/events/${tomorrow}/${endOfWeek}`
    ]
  }
}
