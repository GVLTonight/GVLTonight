<template>
  <div>
    <site-title></site-title>
    <h1>YOU FOUND THE ABOUT PAGE WHOOOAAAAA</h1>
  </div>
</template>

<script>
import SiteTitle from '@/components/SiteTitle.vue'
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
  animation: rotation 2s infinite linear;
}
</style>
