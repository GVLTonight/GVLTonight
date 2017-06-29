<template>
  <div>
    <!--<router-link class="nav-link" to="/"><span>home</span></router-link>-->
    <router-link class="nav-link" to="/about"><span>about</span></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      something: 'somethingggg'
    }
  }
}
</script>

<style scoped>
.nav-link {
  /*max-width:296px;*/
  /*width: 100%;*/
  display: inline-block;
  padding: 5px;
  /*box-shadow: inset 0 -1px 0 1px black;*/
}
</style>
