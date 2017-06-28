<template>
  <div class="events-tonight">
    <div v-if="eventsTonight && eventsTonight.length">
      <ul class="venue">
        <h1 v-on:click="sendGaEvent('tonight header', 'not-a-link', 'no-op')">tonight</h1>
        <hr class="title-divider">
        <li v-for="col of eventsTonight" v-bind:key="col.temporaryId">
          <event v-if="col.data.length > 0" :eventDataProperty="col.data"></event>
        </li>
      </ul>
    </div>
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
