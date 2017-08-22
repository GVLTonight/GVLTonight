module.exports = {
  gvl: {
    name: 'gvltonight',
    city: 'greenville',
    state: 'sc',
    title: 'GVLTONIGHT: live music aggregator for greenville sc',
    ajax: [
      `https://api.gvltonight.com/v1/gvl/tonight`,
      `https://api.gvltonight.com/v1/gvl/thisweek`
    ]
  },
  cola: {
    name: 'colatonight',
    city: 'columbia',
    state: 'sc',
    title: 'COLATONIGHT: live music aggregator for columbia sc',
    ajax: [
      `https://api.colatonight.com/v1/cola/tonight`,
      `https://api.colatonight.com/v1/cola/thisweek`
    ]
  },
  avl: {
    name: 'avltonight',
    city: 'asheville',
    state: 'nc',
    title: 'AVLTONIGHT: live music aggregator for asheville nc',
    ajax: [
      `https://api.avltonight.com/v1/avl/tonight`,
      `https://api.avltonight.com/v1/avl/thisweek`
    ]
  }
}
