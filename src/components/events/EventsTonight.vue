<template>
  <div class="events-tonight">
    <div class="venue" v-if="eventsTonight && eventsTonight.length">

    </div>
  </div>
</template>

<script>
import EventItem from '@/components/events/EventItem.vue'
export default {
  props: [
    'eventDataProperty'
  ],
  components: {
    'eventItem': EventItem
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
