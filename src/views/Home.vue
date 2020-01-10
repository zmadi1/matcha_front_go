<template>
  <div>
    <section class="hero">
      <div class="container">
        <h1 class="title lovr-title">Lovr</h1>
        <h2 class="subtitle lovr-text">Yes... You got here</h2>
      </div>
    </section>
    <LandingColumns></LandingColumns>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from 'vuex'
import LandingColumns from '@/components/LandingColumns.vue'
import axios from 'axios'
import geolocation from 'geolocation'

export default {
  name: 'home',
  data(){
    return {
      imageLink: "https://bulma.io/images/placeholders/128x128.png",
      loc: null
    }
  },
  methods:{
    ...mapMutations([
      'addGeoCoords',
      'getUserData'
    ])
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  components: {
    LandingColumns
  },
  mounted: function() {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(pos => {
	    this.loc = pos
	  }, err => {
	    console.log(err)
	  })
	}
  },
  watch: {
    loc: function(nloc, oloc) {
      this.addGeoCoords(nloc)
	}
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lovers+Quarrel');
@import url('https://fonts.googleapis.com/css?family=Dancing+Script');

.lovr-text {
  font-family: 'Lovers Quarrel', cursive;
	font-size: 35px;
}

.lovr-title {
	font-family: 'Dancing Script', cursive;
	font-size: 50px;
}

.hero-body {
  padding: 0px;
}
</style>
