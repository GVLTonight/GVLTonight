<template>
  <div class="events-this-week">
    <div v-if="eventsThisWeek && eventsThisWeek.length">
      <div class="venue" v-for="col of eventsThisWeek" v-bind:key="col.temporaryId">
        <h1>
          <a v-on:click="sendGaEvent('Venue: ' + col.data[0].venue.name, col.data[0].venue.url, 'venue header')" v-bind:href="col.url">{{col.header}}</a>
        </h1>
        <hr class="title-divider">
        <!--<ul>-->
          <event v-if="col.data.length > 0" :eventDataProperty="col.data"></event>
        <!--</ul>-->
        <ul v-else>
          <li>
            <p><em>no listed upcoming events for this venue</em></p>
            <hr class="event-divider">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/EventItem.vue'
export default {
  props: [
    'eventsThisWeek',
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
