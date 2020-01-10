import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    forgotPasswordModal: false,
    coords: null,
    user: null,
    users: null
  },
  mutations: {
    togglePasswordForget(state){
      state.forgotPasswordModal = !state.forgotPasswordModal
    },
    spliceInterests(state, id){
      state.user.profile.interests.splice(id, 1)
    },
    addGeoCoords(state, coords){
      state.coords = new Array()
      state.coords.push(coords.coords.longitude)
      state.coords.push(coords.coords.latitude)
    },
    addCoords(state, loc){
      state.coords = loc
    },
    userAuth(state){
      state.loggedIn =  true
    },
    logOut(state){
      state.loggedIn = false
    },
    getUserData(state){
      axios.defaults.headers.common["Authorization"] = localStorage.token
      axios.get("http://localhost:4040/user")
      .then(resp => {
        return resp.data
      })
      .then(data => {
        if (data.success == null) {
          state.user = data
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMatches(state){
      axios.defaults.headers.common["Authorization"] = localStorage.token
      const myHeaders = new Headers();
      myHeaders.set('Authorization', localStorage.token)
      fetch("http://localhost:4040/users/matches",
        {headers: myHeaders})
      .then(res => {return res.json()})
      .then(mJson => {
        state.users = mJson
        console.log(mJson)
      })
    },
    linkUsers(state, match) {
      var like = {
        uid: state.user.id,
        mid: match.id
      }
      var response = null
      const myHeaders = new Headers();
      myHeaders.set('Authorization', localStorage.token)
      myHeaders.set('Content-Type', 'application/json')
      fetch("http://localhost:4040/users/matches/like",
        {headers: myHeaders,
        body: JSON.stringify(like),
        method: 'POST'})
      .then(res => {return res.json()})
      .then(mJson => {
        return (mJson.success)
      })
    }
  },
  actions: {
  }
})
