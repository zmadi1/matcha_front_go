<template>
<div class="container">
  <br />
  <br />
  <div class="columns">
    <div class="column is-half">
      <form class="is-centered">
        <div class="columns">
          <div class="column">
            <figure class="image is-128x128">
              <img v-bind:src="image" class="is-rounded" style="object-fit: fill">
            </figure>
          </div>
          <div class="column">
          </div>
        </div>
        <h1 class="title">First Name</h1>
        <p class="subtitile">{{ user.fname }}</p>
        <hr />
        <h1 class="title">Last Name</h1>
        <p class="subtitile">{{ user.lname }}</p>
        <hr />
        <h1 class="title">Username</h1>
        <p class="subtitile">{{ user.username }}</p>
        <!-- interests are displayed here -->
        <hr />
        <h1 class="title">Interests</h1>
        <div class="tags" v-if="user.profile.interests">
          <span class="tag is-info" v-for="(interest, id) in user.profile.interests">
            {{ interest }}
          </span>
        </div>
        <hr />
        <h1 class="title">Gender</h1>
        <p class="subtitle">{{ user.sex }}</p>
        <hr />
        <h1 class="title">Sexual Orientation</h1>
        <p class="subtitle">{{ user.profile.orientation }}</p>
        <hr />
        <div class="buttons is-centered">
          <a class="button is-info" href="#" @click.prevent="editProfile">Edit Profile</a>
        </div>
      </form>
    </div>
    <div class="column is-half">
      <h1 class="title has-text-centered">{{ user.username }} Images</h1>
        <br />
        <div class="columns">
          <div class="column is-full" style="overflow-y: auto;">
            <div class="card is-centered" v-for="(image, index) in user.profile.images">
              <div class="card-image">
                <figure class="image">
                  <img v-bind:src="image" alt="user gallery image">
                </figure>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

axios.defaults.headers.common["Authorization"] = localStorage.token

export default {
  name: "profile",
  data: () => {
    return {
      image: 'https://bulma.io/images/placeholders/128x128.png',
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'getUserData'
    ]),
    editProfile(){
      location.href = location.protocol + '//' + location.host + '/#/editprofile'
    }
  },
  mounted(){
    if (this.user.profile.propic != "") {
      this.image = this.user.profile.propic
    }
  }
}
</script>

<style>
</style>
