<template>
  <div id="app">
    <!--<h1>&#x0287;&#x0265;&#x0183;&#x1D09;uo&#x0287;l&#x028C;&#x0183;</h1>-->
    <!--<h1>gvltonight</h1>-->
    <!--<TopNav class="nav-bar"></TopNav>-->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/top-nav.vue'
export default {
  name: 'app',
  components: {
    TopNav
  }
}
</script>

<style scoped>
  .nav-bar {
    height: 50px;
    background-color: rebeccapurple;
  }
</style>

<style>
::selection {
  /*background: #228b22; /* WebKit/Blink Browsers */
  background: #7787e4; /* WebKit/Blink Browsers */
  color: white;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 600px;
  margin: 30px auto 0;
}

@media all and (max-width: 699px) and (min-width: 0px) {
  #app,
  .container {
    width: 100%;
  }
}
</style>
