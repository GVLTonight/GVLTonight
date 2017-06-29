<template>
  <div>
    <!--<router-link class="nav-link home" to="/"><span>home</span></router-link>-->
    <router-link v-on:click="sendGaEvent('About', '#/about', 'about page')" class="nav-link about" to="/about"><span>about</span></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      something: 'somethingggg'
    }
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

<style scoped>
.home {
  float: left;
}

.about {
  float: right;
}

.nav-link {
  padding: 5px;
}
</style>
