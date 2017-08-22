<template>
  <div class="about">
    <site-title :variant="variant" :about="true"></site-title>
    <h2>this system is    automatic. it goes out to the internet twice daily, pulls public data and displays it here.</h2>
    <h2>check out the source code on github <a href="http://github.com/gvltonight">here</a>. there some different bits that make up the system, feel free to look around, clone, whatever</h2>
    <hr class="title-divider about-divider">
    <h2>any inquiries can be directed
      <a target="_blank" v-on:click="sendEmail()"> here</a>
    </h2>
    <hr class="title-divider about-divider">
    <h2>
      <ul>
        <li><a href="https://gvltonight.com">GVLTonight</a> - Greenville, SC</li>
        <li><a href="https://avltonight.com">AVLTonight</a> - Asheville, NC</li>
        <li><a href="https://colatonight.com">COLATonight</a> - Columbia, SC</li>
      </ul>
    </h2>
  </div>
</template>

<script>
import SiteTitle from '@/components/SiteTitle.vue'
export default {
  components: {
    SiteTitle
  },
  methods: {
    sendEmail: function () {
      document.location.href = 'mailto:kevbost@gmail.com'
    }
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
 cursor: pointer;
}

h2 {
  padding-top: 1.5rem;
  font-size: 1.5rem;
  line-height: 1.8rem;
  font-weight: normal;
  text-align: justify;
  hyphens: auto;
}

ul {
  text-align: right;
}

.about-divider {
  margin-top: 1.5rem;
  margin-bottom: 0;
}

</style>
