<template>
  <div class="errors">
      <ul v-if="errorList && errorList.length">
      <li v-for="error of errorList" v-bind:key="error.message">
        <h1>{{error.message}}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'errorList'
  ]
}
</script>

<style>

</style>
