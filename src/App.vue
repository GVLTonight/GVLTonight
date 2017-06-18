<template>
  <div id="app">
    <!--<h1>&#x0287;&#x0265;&#x0183;&#x1D09;uo&#x0287;l&#x028C;&#x0183;</h1>-->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>

</style>

<style>
::selection {
  background: #228b22; /* WebKit/Blink Browsers */
  color: white;
}

body {
  margin-top: 0;
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
