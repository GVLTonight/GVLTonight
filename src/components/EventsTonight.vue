<template>
  <div class="events-tonight">
    <ul v-if="eventsTonight && eventsTonight.length">
      <h1 v-on:click="sendGaEvent('tonight header', 'not-a-link', 'no-op')">tonight</h1>
      <hr class="title-divider">
      <div v-for="col of eventsTonight" v-bind:key="col.temporaryId">
        <ul v-if="col.data.length > 0">
          <event :eventDataProperty="col.data"></event>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
import EventItem from '@/components/EventItem.vue'
export default {
  props: [
    'eventsTonight',
    'eventDataProperty'
  ],
  components: {
    'event': EventItem
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
