<template>
  <div class="venue">
    <h1 v-on:click="sendGaEvent('page header', 'not-a-link', 'no-op')">
      <router-link to="/">{{variant.name}}</router-link>
    </h1>
    <hr class="title-divider">
    <em>live music aggregator for {{variant.city}} {{variant.state}}</em>
    <hr class="event-divider">
  </div>
</template>

<script>
export default {
  props: [
    'variant'
  ]
}
</script>

<style scoped>
  /*a {
    display: block;
  }

  a:hover {
    color: black;
  }*/

  h1 {
    padding-top: .7em;
  }

  a:hover {
    color: white;
    background-color: black;
  }
</style>
