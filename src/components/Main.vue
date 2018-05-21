<template>
  <div class="main">
    <site-title :variant="variantObject"></site-title>
    <errors :errorList="errors"></errors>
    <h1 class="notification">Facebook has disallowed access to all public events, which is the core feature that allows {{variant.name}} to work. Until this issue is resloved, this site has no choice but to remain inactive.</h1>
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
import {accessorize} from '../utils/dataTransformations'
import dataFetcher from '../utils/dataFetcher'

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
    dataFetcher(process.env.VARIANT)
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

</script>

<style scoped>
  .notification {
    background-color: red;
    color: white;
    line-height: normal;
    padding-top: 0;
    margin-top: 1.5em;
    font-weight: bold;
    font-style: italic;
  }
</style>
