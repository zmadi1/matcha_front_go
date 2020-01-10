<template>
  <div>
    <div class="modal" v-bind:class="{'is-active': forgotPasswordModal}">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Forgot Password</p>
          <button class="delete" aria-label="close" v-on:click="togglePasswordForget()"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="label">Enter email</label>
              <div class="control">
                <input required class="input is-medium" type="text" v-model="email">
              </div>
            </div>
            <p class="subtitle">Link will be sent to your email should there be an account with this email</p>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Submit</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "forgotPassword",
  data(){
    return {
      email: ''
    }
  },
  methods: {
    ...mapMutations([
      'togglePasswordForget'
    ])
  },
  computed: {
    ...mapState([
      'forgotPasswordModal'
    ])
  }
}
</script>
