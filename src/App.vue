<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/" v-if="loggedIn">Home</router-link>
          <router-link class="navbar-item" to="/auth" v-if="!loggedIn">Auth</router-link>
          <router-link class="navbar-item" to="/profile" v-if="loggedIn">Profile</router-link>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" v-if="loggedIn" v-on:click="logUserOut()">Logout</a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'app',
  data(){
    return {
    }
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  },
  methods: {
    ...mapMutations([
      'addCoords',
      'logOut',
      'userAuth',
      'getUserData'
    ]),
    logUserOut(){
      this.logOut()
      location.href = location.protocol + '//' + location.host + '/#/auth'
    }
  },
  mounted: function() {
    fetch('https://ipinfo.io/json')
    .then(res => {return res.json()})
    .then(myJson => {
      console.log(myJson)
      try {
        this.addCoords(myJson.loc.split(',').map(Number).reverse())
	  }
      catch(error) {
	    console.log("Failed to get ip address geolocation")
	  }
      if (this.loggedIn == false) {
        location.href = location.protocol + '//' + location.host + '/#/auth'
      }
    }).catch(err => console.log(err))
    if (this.loggedIn == false) {
      if (localStorage.token == "") {
        location.href = location.protocol + '//' + location.host + '/#/auth'
        return
      } else {
        axios.defaults.headers.common["Authorization"] = localStorage.token
        axios.get("http://localhost:4040/users/check")
        .then(resp => {
          return resp.data
        })
        .then(data => {
          if (data.success) {
            this.userAuth()
            this.getUserData()
            location.href = location.protocol + '//' + location.host + '/#/'
          }
        })
      }
    }
  }
}
</script>

<style>
body {
  padding: 0px;
  border: 0px;
}
</style>
