<template>
  <div class="main">
    <site-title :variant="variantObject"></site-title>
    <toggle :sortOptionToggle="sortOption" v-on:day="updateSortFromToggle('day')" v-on:venue="updateSortFromToggle('venue')"></toggle>
    <errors :errorList="errors"></errors>
    <events-tonight :eventsTonight="tonightsEvents"></events-tonight>
    <events-this-week v-if="sortOption === 'venue'" :eventsThisWeek="thisWeeksEvents"></events-this-week>
    <events-by-day v-else-if="sortOption === 'day'" :eventsThisWeekByDay="thisWeeksEventsByDay"></events-by-day>
  </div>
</template>

<script>
import EventsTonight from '@/components/EventsTonight.vue'
import EventsThisWeek from '@/components/EventsThisWeek.vue'
import EventsByDay from '@/components/EventsByDay.vue'
import EventItem from '@/components/EventItem.vue'
import SiteTitle from '@/components/SiteTitle.vue'
import Errors from '@/components/Errors.vue'
import Toggle from '@/components/Toggle.vue'
import {accessorize} from '../utils/dataTransformations'
import dataFetcher from '../utils/dataFetcher'

export default {
  data: () => ({
    message: 'hello!',
    errors: [],
    tonightsEvents: [],
    thisWeeksEvents: [],
    thisWeeksEventsByDay: [],
    variantObject: process.env.VARIANT,
    sortOption: 'day'
  }),
  props: {
    variant: {},
    eventsTonight: {},
    eventsThisWeek: {},
    eventsThisWeekByday: {},
    errorList: {},
    sortOptionToggle: {}
  },

  components: {
    SiteTitle,
    EventsTonight,
    EventsThisWeek,
    EventsByDay,
    EventItem,
    Errors,
    Toggle
  },

  methods: {
    updateSortFromToggle: function (value) {
      this.sortOption = value
      console.log(`switch to ${value}`)
    },
    sendGaEvent: function (category, url, title) {
      this.$ga.event({
        eventCategory: category,
        eventAction: url,
        eventLabel: title
      })
    }
  },

  updated () {
    console.log('UPDATED')
  },

  created () {
    if (this.sortOption === 'day') {
      dataFetcher(process.env)
      .then(thisWeeksEventsObject => {
        this.thisWeeksEventsByDay = thisWeeksEventsObject.dayOfWeek
        this.thisWeeksEvents = thisWeeksEventsObject.week
        this.tonightsEvents = thisWeeksEventsObject.tonight
        accessorize(this.thisWeeksEventsByDay)
        accessorize(this.thisWeeksEvents)
        accessorize(this.tonightsEvents)
      })
      .then(() => {
        // const unordered = {"Friday":["5:00pm to 12:00am"] ,"Wednesday":["5:00pm to 11:00pm"],"Sunday":["11:00am to 11:00pm"], "Thursday":["5:00pm to 11:00pm"],"Saturday":["11:00am to 12:00am"]};

        // const ordered = {};
        // Object.keys(thisWeeksEventsByDay).sort(function (a, b) {
        //     return moment(a, 'ddd dddd').weekday() > moment(b, 'ddd dddd').weekday();
        // }).forEach(function(key) {
        //     ordered[key] = unordered[key];
        // });

        // return ordered;
        this.thisWeeksEventsByDay.sort(function (a, b) {
          return moment(a.header, 'ddd dddd').weekday() > moment(b.header, 'ddd dddd').weekday()
          // return a.sortOrder - b.sortOrder
        })
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
    } else if (this.sortOption === 'venue') {

    }
  }
}

</script>

<style scoped>

</style>
