<template>
  <div class="venue">
    <h1 v-on:click="sendGaEvent('page header', 'not-a-link', 'no-op')">
      <router-link to="/">{{variant.name}}</router-link>
    </h1>
    <hr class="title-divider">
    <em>live music aggregator for {{variant.city}} {{variant.state}}</em>
    <hr class="event-divider">
  </div>
</template>

<script>
export default {
  props: [
    'variant',
    'about'
  ]
}
</script>

<style scoped lang="scss">
/* ---------- GENERAL ---------- */

body {
	background: #4a4a4a;
	color: #151515;
	font: 100%/1.5em "Lato", sans-serif;
	margin: 0;
}

input {
    font-family: inherit;
    font-size: 100%;
    line-height: normal;
    margin: 0;
}

input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
}

// h1 {
//   padding-top: .7em;
// }

// a {
//   &:hover {
//     color: white;
//     background-color: black;
//     span {
//       height: 2em;
//       background-color: pink;
//       padding: .5em;
//     }
//   }
// }

  @media(max-width: 600px){
    h1 {
      display: none;
    }

    .title-divider {
      border: none;
    }
  }

</style>
