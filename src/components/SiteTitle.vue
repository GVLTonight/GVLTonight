<template>
  <div class="venue">
    <h1 v-on:click="sendGaEvent('page header', 'not-a-link', 'no-op')">
      <router-link to="/">gvltonight</router-link>
    </h1>
    <hr class="title-divider">
    <em>live music aggregator for greenville sc</em>
    <hr class="event-divider">
  </div>
</template>

<script>
export default {

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

  }

  a:hover {
    color: white;
    background-color: black;
  }
</style>
