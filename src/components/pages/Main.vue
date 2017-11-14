<template>
  <div class="main">
    <site-title :variant="variantObject"></site-title>
    <toggle :sortOptionToggle="sortOption" v-on:day="updateSortFromToggle('day')" v-on:venue="updateSortFromToggle('venue')"></toggle>
    <errors :errorList="errors"></errors>
  </div>
</template>

<script>
import SiteTitle from '@/components/elements/SiteTitle.vue'
import Errors from '@/components/elements/Errors.vue'
import Toggle from '@/components/elements/Toggle.vue'

export default {
  data: () => ({
    errors: [],
    sortOption: 'day',
    variantObject: process.env.VARIANT
  }),
  props: {
    variant: {},
    errorList: {},
    sortOptionToggle: {}
  },

  components: {
    SiteTitle,
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
    // axios.get('https://api.gvltonight.com/v1/gvl/thisweek/sorted')
    //   .then((res) => {
    //     this.eventsThisWeekByday = res.data.day
    //     // this.eventsThisWeek = res.data.venue
    //   })
    //   .then(() => {
    //     const ordered = {}
    //     Object.keys(this.eventsThisWeekByday).sort((a, b) => moment(a, 'dddd').weekday() > moment(b, 'dddd').weekday()).forEach((key) => {
    //       ordered[key] = this.eventsThisWeekByday[key]
    //     })
    //     this.eventsThisWeekByday = ordered
    //     return this.eventsThisWeekByday
    //   })
    if (this.sortOption === 'day') {

    } else if (this.sortOption === 'venue') {

    }
  }
}

</script>

<style scoped>

</style>
