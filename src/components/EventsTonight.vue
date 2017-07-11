<template>
  <div class="events-tonight">
    <div class="venue" v-if="eventsTonight && eventsTonight.length">
      <h1 v-on:click="sendGaEvent('tonight header', 'not-a-link', 'no-op')">tonight</h1>
      <hr class="title-divider">
      <div v-for="col of eventsTonight" v-bind:key="col.temporaryId">
        <event-tonight v-if="col.data.length > 0" :eventDataProperty="col.data"></event-tonight>
      </div>
    </div>
  </div>
</template>

<script>
import EventItemTonight from '@/components/EventItemTonight.vue'
export default {
  props: [
    'eventsTonight',
    'eventDataProperty'
  ],
  components: {
    'eventTonight': EventItemTonight
  },
  methods: {
    sendGaEvent: function (category, url, title) {
      this.$ga.event({
        eventCategory: category,
        eventAction: url,
        eventLabel: title
      })
    }
  }
}
</script>

<style>

</style>
