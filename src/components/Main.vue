<template>
  <div class="main">
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        <h1>{{error.message}}</h1>
      </li>
    </ul>
    <site-title></site-title>

    <events-tonight :eventsTonight="tonightsEvents"></events-tonight>
    <events-this-week :eventsThisWeek="thisWeeksEvents"></events-this-week>

  </div>
</template>

<script>
import EventsTonight from '@/components/EventsTonight.vue'
import EventsThisWeek from '@/components/EventsThisWeek.vue'
import EventItem from '@/components/EventItem.vue'
import SiteTitle from '@/components/SiteTitle.vue'
import moment from 'moment'
import axios from 'axios'
export default {
  data: () => ({
    errors: [],
    thisWeeksEvents: [],
    tonightsEvents: []
  }),

  props: [
    'eventsTonight',
    'eventsThisWeek'
  ],

  components: {
    SiteTitle,
    EventsTonight,
    EventsThisWeek,
    EventItem
  },

  methods: {
    sendGaEvent: function (category, url, title) {
      this.$ga.event({
        eventCategory: category,
        eventAction: url,
        eventLabel: title
      })
    }
  },

  created () {
    let tomorrow = moment().add(1, 'day').format('YYYY-MM-DD')
    let endOfWeek = moment().add(7, 'day').format('YYYY-MM-DD')

    axios.all([
      // axios.get(`http://localhost:8000/v1/tonight`),
      // axios.get(`http://localhost:8000/v1/events/${tomorrow}/${endOfWeek}`)
      // axios.get(`https://api.colatonight.com/v1/cola/tonight`),
      // axios.get(`https://api.colatonight.com/v1/cola/events/${tomorrow}/${endOfWeek}`)
      axios.get(`https://api.gvltonight.com/v1/tonight`),
      axios.get(`https://api.gvltonight.com/v1/events/${tomorrow}/${endOfWeek}`)
    ])
    // axios.spread returns an array ie: function (will_be_index[0], will_be_index[1]) { }
    .then(
      axios.spread(function (tonight, week) {
        return {
          week: groupBySorter(week.data, 'groupBy'),
          tonight: groupBySorter(tonight.data, 'groupBy')
        }
      })
    )
    .then(rebuilt => {
      return {
        week: rebuild(rebuilt, 'week'),
        tonight: rebuild(rebuilt, 'tonight')
      }
    })
    .then(thisWeeksEventsObject => {
      this.thisWeeksEvents = thisWeeksEventsObject.week
      this.tonightsEvents = thisWeeksEventsObject.tonight
      accessorize(this.thisWeeksEvents)
      accessorize(this.tonightsEvents)
    })
    .then(() => {
      this.thisWeeksEvents.sort(function (a, b) {
        return a.sortOrder - b.sortOrder
      })
      this.tonightsEvents.sort(function (a, b) {
        return a.sortOrder - b.sortOrder
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

// Converts a flat collection of documents into:
// -- { title: [array], title2: [array], etc: [etc] }
// ---- groupBySorter( {array}, {value in documents to convert into key, and sort by} )
function groupBySorter (arr, property) {
  return arr.reduce(function (buffer, x) {
    if (!buffer[x[property]]) { buffer[x[property]] = [] }
    buffer[x[property]].push(x)
    return buffer
  }, {})
}

// Mutates values to be more human-readable friendly
function accessorize (rebuiltObj) {
  rebuiltObj.forEach(topLevObj => {
    topLevObj.data.map(innerObj => {
      if (moment(innerObj.datetime).format(('YYYY-MM-DD')) === moment().format(('YYYY-MM-DD'))) {
        innerObj.isToday = true
        innerObj.timeofday = innerObj.datetime.split('T')[1] > '18:00:00' ? 'TONIGHT' : 'TODAY'
      }
      innerObj.date = moment(innerObj.datetime).format('ddd MM/DD/YYYY')
      innerObj.time = moment(innerObj.datetime).format('h:mm A')
    })
  })
}

// Adds useful values =>
// -- { collectionName: { header: 'string', url: 'string', sortOrder: Number, data: [ Array ] } }
function rebuild (rebuiltObj, param) {
  let bufferArray = []
  for (let x in rebuiltObj[param]) {
    let _el = rebuiltObj[param][x]
    let _venueName = _el[0].groupBy === 'other' ? _venueName = 'other' : _venueName = _el[0].venue.name
    bufferArray.push({
      header: _venueName.toLowerCase(),
      url: _el[0].venue.url,
      sortOrder: _el[0].sortOrder,
      temporaryId: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
      data: rebuiltObj[param][x].sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime)
      })
    })
  }
  return bufferArray
}

</script>

<style scoped>

</style>
