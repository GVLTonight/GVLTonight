<template>
  <div>
    <site-title></site-title>
    <h1 class="loading">hi sweet mary, i love you</h1>
  </div>
</template>

<script>
import SiteTitle from '@/components/SiteTitle.vue'
// import EventsTonight from '@/components/EventsTonight.vue'
// import EventsThisWeek from '@/components/EventsThisWeek.vue'
// import EventItem from '@/components/EventItem.vue'
export default {
  components: {
    SiteTitle
  }
}
</script>

<style>
.loading {
  width: 100%;
  font-family: monospace;
  text-align: center;
}
</style>
