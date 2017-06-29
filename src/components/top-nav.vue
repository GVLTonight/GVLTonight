<template>
  <div>
    <!--<router-link class="nav-link home" to="/"><span>home</span></router-link>-->
    <router-link class="nav-link about" to="/about"><span>about</span></router-link>
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
