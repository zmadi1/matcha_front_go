<template>
  <div>
    <nav class="level">
    <div class="buttons are-small level-item">
      <a v-on:click="showLog()" class="button is-inverted is-danger">Login</a>
      <a v-on:click="showReg()" class="button is-inverted is-danger">Register</a>
    </div>
    </nav>
    <Register v-bind:reg="reg"></Register>
    <Login v-bind:log="log"></Login>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import { mapState } from 'vuex'

export default {
  name: "auth",
  data(){
    return {
      log: true,
      reg: false
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    showLog: function(){
      if (this.log == false) {
        this.log = true
        this.reg = false
      }
      return this.log
    },
    showReg: function(){
      if (this.reg == false) {
        this.log = false
        this.reg = true
      }
      return this.reg
    }
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  }
}
</script>
