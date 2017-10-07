<template>
  <ul>
    <li v-for="item of eventDataProperty" v-bind:key="item._id">
      <div v-bind:class="{ today: item.isToday }">
        <p v-if="item.groupBy === 'other' || item.isToday">
          <a target="_blank" v-on:click="sendGaEvent('Venue: ' + item.venue.name, item.venue.url, 'event venue')" v-bind:href="item.venue.url">
            {{item.venue.name}}
          </a>
        </p>
        <p>
          <em>
            <a target="_blank" v-on:click="sendGaEvent('Event: ' + item.venue.name, item.url, item.title)" v-bind:href="item.url">
              {{item.title}}
            </a>
          </em>
        </p>
        <p>
          <span v-if="item.isToday">
            <span v-bind:class="{ green: item.isToday }">
              {{item.timeofday}}
            </span>:
          </span>
          {{item.date}}, {{item.time}}
        </p>
      </div>
      <hr class="event-divider">
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'eventsTonight',
    'eventDataProperty'
  ],
  methods: {
    sendGaEvent: function(category, url, label) {
      this.$ga.event({
        eventCategory: category,
        eventAction: url,
        eventLabel: label
      })
    }
  }
}
</script>

<style>

</style>
