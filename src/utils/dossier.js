module.exports = {
  gvl: {
    name: 'gvltonight',
    city: 'greenville',
    state: 'sc',
    title: 'GVLTONIGHT: live music aggregator for greenville sc',
    uaid: '1',
    ajax: [
      'https://api.gvltonight.com/v1/gvl/tonight',
      'https://api.gvltonight.com/v1/gvl/thisweek'
    ]
  },
  avl: {
    name: 'avltonight',
    city: 'asheville',
    state: 'nc',
    title: 'AVLTONIGHT: live music aggregator for asheville nc',
    uaid: '2',
    ajax: [
      'https://api.avltonight.com/v1/avl/tonight',
      'https://api.avltonight.com/v1/avl/thisweek'
    ]
  },
  cola: {
    name: 'colatonight',
    city: 'columbia',
    state: 'sc',
    title: 'COLATONIGHT: live music aggregator for columbia sc',
    uaid: '3',
    ajax: [
      'https://api.colatonight.com/v1/cola/tonight',
      'https://api.colatonight.com/v1/cola/thisweek'
    ]
  },
  clt: {
    name: 'queencitytonight',
    city: 'charlotte',
    state: 'nc',
    title: 'QUEENCITYTONIGHT: live music aggregator for charlotte nc',
    uaid: '3',
    ajax: [
      'https://api.clttonight.com/v1/clt/tonight',
      'https://api.clttonight.com/v1/clt/thisweek'
    ]
  }
}
