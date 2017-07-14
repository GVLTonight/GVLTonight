<template>
  <div class="main">
    <site-title :variant="variantObject"></site-title>
    <errors :errorList="errors"></errors>
    <events-tonight :eventsTonight="tonightsEvents"></events-tonight>
    <events-this-week :eventsThisWeek="thisWeeksEvents"></events-this-week>
  </div>
</template>

<script>
import EventsTonight from '@/components/EventsTonight.vue'
import EventsThisWeek from '@/components/EventsThisWeek.vue'
import EventItem from '@/components/EventItem.vue'
import SiteTitle from '@/components/SiteTitle.vue'
import Errors from '@/components/Errors.vue'
import axios from 'axios'
import {groupBySorter, accessorize, rebuild} from '../utils/dataTransformations'
export default {
  data: () => ({
    message: 'hello!',
    errors: [],
    tonightsEvents: [],
    thisWeeksEvents: [],
    variantObject: process.env.VARIANT
  }),
  props: {
    variant: {},
    eventsTonight: {},
    eventsThisWeek: {},
    errorList: {}
  },

  components: {
    SiteTitle,
    EventsTonight,
    EventsThisWeek,
    EventItem,
    Errors
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
    axios.all([
      // axios.get(`http://localhost:8000/v1/tonight`),
      // axios.get(`http://localhost:8000/v1/events/${tomorrow}/${endOfWeek}`)

      axios.get(process.env.VARIANT.ajax[0]),
      axios.get(process.env.VARIANT.ajax[1])
    ])
    // axios.spread returns an array ie: function (will_be_index[0], will_be_index[1]) { }
    .then(
      axios.spread(function (tonight, week) {
        console.dir(JSON.stringify(tonight.data[1]))
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
      // console.log(thisWeeksEventsObject.tonight)
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

</script>

<style scoped>

</style>
