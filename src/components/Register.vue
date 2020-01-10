<template>
  <div class="hero-body" v-if="displayReg">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
        <h3 class="title has-text-grey">Lovr</h3>
        <p class="subtitle has-text-grey">Create a Lovr Account</p>
          
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input required class="input is-medium" type="email" v-model="email" placeholder="Enter your email address" v-bind:class="emailCheck">
            </div>
          </div>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input required class="input is-medium" type="text" v-model="username" placeholder="What you'll use to login" v-bind:class="usernameCheck">
            </div>
          </div>
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input required class="input is-medium" type="text" v-model="fname" placeholder="Enter your first name" v-bind:class="fnameCheck">
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input required class="input is-medium" type="text" v-model="lname" placeholder="Enter your last name" v-bind:class="lnameCheck">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input required class="input is-medium" type="password" v-model="password" placeholder="Enter password" v-bind:class="passwordCheck">
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input required class="input is-medium" type="password" v-model="confirmpass" placeholder="Confirm password" v-bind:class="confirmCheck">
            </div>
          </div>
          <a class="button is-success" v-on:click="registerUser()">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: "register",
  props: {
    reg: Boolean
  },
  data() {
    return {
      email: '',
      emailCheck: false,
      username: '',
      usernameCheck: false,
      password: '',
      passwordCheck: false,
      confirmpass: '',
      confirmCheck: false,
      fname: '',
      fnameCheck: false,
      lname: '',
      lnameCheck: false,
      regSuccess: false
    }
  },
  methods: {
    registerUser() {
      let body = {
        error: null,
        email: this.email,
        username: this.username,
        password: this.password,
        fname: this.fname,
        lname: this.lname,
        location: {
          type: 'Point',
          coordinates: this.coords
        }
      }
      //convert the body to a string and send it to the
      //server with the header.
      this.checkForm(body)
      if (this.isValid) {
        const myHeaders = new Headers()
        myHeaders.set('Content-Type', 'application/json')
        body = JSON.stringify(body)
        console.log("Sending request")
        fetch('http://localhost:4040/user', {
        headers: myHeaders,
        body: body,
        method: "POST"})
        .then(myJson => { return myJson.json()})
        .then(data => {
          console.log(data)
          this.username = ''
          this.email = ''
          this.password = ''
          this.confirmpass = ''
          this.fname = ''
          this.lname = ''
          this.regSuccess = true
        })
        .catch(err => console.log(err))
      }
    },
    checkForm(body){
      if (body.password.length < 7 || body.password != body.password) {
        this.passwordCheck = false
        this.confirmCheck = false
      } else {
        this.passwordCheck = true
        this.confirmCheck = true
      }
      if (body.username == "") {
        this.usernameCheck = false
      } else {
        this.usernameCheck = true 
      }
      if (body.email == "") {
        this.emailCheck = false
      } else {
        this.emailCheck = true
      }
      if (body.fname == "") {
        this.fnameCheck = false
      } else {
        this.fnameCheck = true
      }
      if (body.lname == "") {
        this.lnameCheck = false
      } else {
        this.lnameCheck = true
      }
    }
  },
  computed: {
    isValid(){
      if (this.emailCheck && this.passwordCheck && this.confirmCheck && this.usernameCheck && this.fnameCheck && this.lnameCheck)
        return true
      else
        return false
    },
    displayReg(){
      if (this.reg == false)
        return false
      return true
    },
    ...mapState([
      'coords'
    ])
  }
}
</script>
