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
/* reset from http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation */
html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;box-sizing: border-box}
*,*:before,*:after{box-sizing: inherit}
body{margin:0;font:16px/1 sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,p,blockquote,figure,ol,ul{margin:0;padding:0}
main,li{display:block}
h1,h2,h3,h4{font-size:inherit}
strong{font-weight:700}
a,button{color:inherit;transition:.3s}
a{text-decoration:none}
button{overflow:visible;border:0;font:inherit;-webkit-font-smoothing:inherit;letter-spacing:inherit;background:none;cursor:pointer}
::-moz-focus-inner{padding:0;border:0}
:focus{outline:0}
img{max-width:100%;height:auto;border:0}

::selection {
  background: #7787e4;
  color: white;
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
  margin: 0 auto;
}

@media all and (max-width: 699px) and (min-width: 0px) {
  #app,
  .container {
    width: 100%;
  }
}
</style>
