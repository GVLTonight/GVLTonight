<template>
  <div class="switch-container">
    <span class="switch-background inset-border left"></span>
    <button v-on:click="switchLeft" class="switch left active">days</button>
    <button v-on:click="switchRight" class="switch right">venues</button>
  </div>
</template>

<script>

export default {
  methods: {
    switchRight: function () {
      document.querySelector('.switch.right').classList.add('active')
      document.querySelector('.switch.left').classList.remove('active')
      document.querySelector('.switch-background').style.left = '50%'
    },
    switchLeft: function () {
      document.querySelector('.switch.right').classList.remove('active')
      document.querySelector('.switch.left').classList.add('active')
      document.querySelector('.switch-background').style.left = '0%'
    }
  },

  created () {

  }
}
</script>

<style scoped lang="scss">

/* ------ DETERMINE WHITE OR BLACK ------ */
// determines if contrast color should
// be white or black, based on lightness of
// primary color
@function determine-white-or-black($color) {
  @if (lightness($color) > 50) {
    @return #000000;
  } @else {
    @return #ffffff;
  }
}

$primary: #5bb477;
$contrast: #eee;
$active-shadow-width: 5px;
$border: $contrast;
$speed: .3s;
$width: 500px;
$height: 30px;

.switch-container {
  width: $width;
  height: $height;
  margin: 0 auto;
  border: 1px solid $border;
  cursor: pointer;
  position: relative;
	text-align: center;
	will-change: transform;
	transition: $speed ease all;
  color: $primary;
  background: $contrast;

  .switch {
    color: darken($contrast, 20%);
		display: inline-block;
		background: none;
		width: 49%;
		height: 100%;
		position: relative;
		border: none;
		transition: $speed ease all;
		text-transform: uppercase;
		letter-spacing: 5px;
    z-index: 123 !important;

    &.active {
      color: $contrast;
      &:hover {
        color: lighten($contrast, 20%);
      }
    }

		&:hover {
			color: lighten($primary, 20%);
			cursor: pointer;
		}

		&:focus {
			outline: none;
		}
  }

  .switch-background {
    background-color: $primary;
    box-shadow: 0 0 0 $active-shadow-width $primary;
    position: absolute;
    left: 0%;
    top: 0%;
    width: 50%;
    height: 100%;
    z-index: -1;
    transition: $speed ease-out all;
  }
}
</style>
