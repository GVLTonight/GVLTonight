<template>
  <div id="app">
    <!--<h1>&#x0287;&#x0265;&#x0183;&#x1D09;uo&#x0287;l&#x028C;&#x0183;</h1>-->
    <!--<h1>gvltonight</h1>-->
    <TopNav :variant="cityVariant"></TopNav>
    <div class="container">
      <router-view keep-alive :variant="cityVariant"></router-view>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/elements/TopNav.vue'
export default {
  name: 'app',
  components: {
    TopNav
  },
  data: () => ({
    cityVariant: {}
  }),
  props: {
    variant: {}
  }
}
</script>

<style scoped>

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

/* ------------------------- */
/* ------------------------- */
/* ------------------------- */

.hidden {
  display: none;
}

h1 {
  padding-top: 1.5em;
  font-size: 2em;
  font-weight: normal;
}

hr {
  border-right: 200px solid #fff;
  border-left: 200px solid #fff;
}

hr.title-divider {
  border-top: 1px dashed #bbbbbb;
}

hr.event-divider {
  width: 10px;
  border-top: 1px dashed #eeeeee;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  background: red;
  color: white;
  font-style: normal;
}

p {
  font-size: 1em;
}

ul {
  list-style-type: none;
}

li>div {
  padding: 0.4em 0;
}

.green {
  color: #5b96b4;
}

.today {
  color: #5bb477;
  font-weight: bold;
}

</style>
