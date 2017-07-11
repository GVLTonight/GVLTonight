<template>
  <div class="about">
    <site-title :variant="variant" :about="true"></site-title>
    <h2>oh... hi there</h2>
    <h2>it's nice to see you here, seeking to further your knowledge about this system and my intentions for it.</h2>
    <h2>fist thing to understand is that it's automatic. the system goes out to the internet twice daily, jacks some public data and displays it here. second thing to understand is that i dont like capital letters or punctuation</h2>
    <h2>check out the source code on github <a href="http://github.com/gvltonight">here</a>. there some different bits that make up the system, feel free to look around, clone, whatever</h2>
  </div>
</template>

<script>
import SiteTitle from '@/components/SiteTitle.vue'
export default {
  components: {
    SiteTitle
  },
  props: {
    variant: {},
    about: {}
  }
}
</script>

<style scoped>
.loading {
  width: 100%;
  font-family: monospace;
  text-align: center;
  animation: rotation 2s infinite linear;
}

.about {
  padding: 0 2em;
}

a {
 text-decoration: underline;
}

h2 {
  padding-top: 1em;
  font-size: 1.5em;
  line-height: 1.2em;
  font-weight: normal;
  text-align: justify;
  hyphens: auto;
}

</style>
