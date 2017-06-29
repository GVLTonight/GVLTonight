<template>
  <site-title></site-title>
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
