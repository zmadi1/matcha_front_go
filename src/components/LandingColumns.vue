<template>
  <div class="columns">
    <div class="column is-one-third">
      <div class="card">
        <div class="card-content">
          <figure class="image">
            <img class="is-rounded"
            v-bind:src="checkPropic"
            alt="Placeholder image" style="height: 150px; width: 150px;">
          </figure>
          <p class="title">Stats for:</p>
          <p v-if="user" class="subtitle has-text-centered">{{ user.fname }}  {{ user.lname }}</p>
          <hr />
          <hr />
          <p class="title">Fame rating</p>
          <p v-if="user" class="subtitle has-text-centered">{{ user.profile.fame }}</p>
          <hr />
          <hr />
          <p class="title">Likes</p>
          <p v-if="user" class="subtitle has-text-centered">{{ user.profile.likes }}</p>
          <hr />
          <hr />
          <p class="title">Visits</p>
          <p v-if="user" class="subtitle has-text-centered">{{ user.profile.visits }}</p>
        </div>
      </div>
    </div>
    <div class="column is-half">
          <Profiles></Profiles>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Profiles from '@/components/MatchMake.vue'
export default {
  name: "landingColumn",
  data(){
    return {
      propic: "https://bulma.io/images/placeholders/1280x960.png"
    }
  },
  computed: {
    ...mapState([
      'user',
    ]),
    checkPropic(){
      if (this.user != null) {
        if(this.user.profile.propic != null) {
          if (this.user.profile.propic != "")
          return this.user.profile.propic
        } else {
          return this.propic
        }
      } else {
        return this.propic
      }
    }
  },
  components: {
    Profiles
  }
}
</script>

<style scoped>
</style>
