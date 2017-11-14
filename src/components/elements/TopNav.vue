<template>
  <div class="nav-bar">
    <!--<router-link class="nav-link home" to="/"><span>home</span></router-link>-->
    <router-link v-on:click="sendGaEvent('Home', '#/', 'home page')" class="nav-link home" to="/"><span>home</span></router-link>
    <router-link v-on:click="sendGaEvent('Title', '#/', 'home page')" class="nav-link title" to="/"><span>{{variant.name}}</span></router-link>
    <router-link v-on:click="sendGaEvent('About', '#/about', 'about page')" class="nav-link about" to="/about"><span>about</span></router-link>
  </div>
</template>

<script>
export default {
  methods: {
    sendGaEvent: function (category, url, title) {
      this.$ga.event({
        eventCategory: category,
        eventAction: url,
        eventLabel: title
      })
    }
  },

  data: () => ({
    variant: process.env.VARIANT
  })
}
</script>

<style scoped>

.nav-bar {
  height: 2em;
  /*background-color: #7787e4;*/
}

.nav-link {
  padding: .5em;
}

.title {
  display: none;
  padding: .5em;
  position: relative;
}

.home {
  float: left;
}

.about {
  float: right;
}

@media(max-width: 600px){
  .nav-bar {
    box-shadow: 0 1px 0 0 black;
  }
  .nav-link {
    font-size: 1em;
  }
  .title {
    display: inline-block;
  }
}

</style>
