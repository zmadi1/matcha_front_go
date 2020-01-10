<template>
  <div class="hero-body" v-if="displayLog">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
          <h3 class="title has-text-grey">Lovr</h3>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input required class="input is-medium" type="text" v-model="username" placeholder="Enter your username or email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input required class="input is-medium" type="password" v-model="password" placeholder="Enter Password">
            </div>
          </div>
          <div class="level">
            <div class="buttons are-medium level-item">
              <a class="button is-success" v-on:click="login()">Login</a>
              <a class="button is-danger" v-on:click="togglePasswordForget()">Forgot Password</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ForgotModal v-on:click="togglePasswordForget()"></ForgotModal>
  </div>
</template>

<script>
import ForgotModal from '@/components/ForgotPassword.vue'
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: "login",
  props: {
    log : Boolean
  },
  components: {
    ForgotModal
  },
  data() {
    return {
      modalOn: false,
      username: '',
      password: '',
      logform: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      this.logform.username = this.username
      this.logform.password = this.password
      axios.post('http://localhost:4040/users/login', this.logform)
        .then(resp => {
          window.localStorage.setItem('token', resp.data.token)
          this.userAuth()
          location.href = location.protocol + '//' + location.host + '/#/'
        })
    },
    ...mapMutations([
      'togglePasswordForget',
      'userAuth'
    ])
  },
  computed: {
    displayLog(){
      if (this.log == false)
        return false
      return true
    },
    ...mapState([
      'loggedIn'
    ])
  },
  mounted: function(){
    if (this.loggedIn) {
      location.href = location.protocol + '//' + location.host + '/#/'
    }
  }
}
</script>
