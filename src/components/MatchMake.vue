<template>
<div class="card">
  <header class="card-header has-background-primary">
    <p v-if="currentMatch" class="card-header-title">
      This is {{ currentMatch.username }}
    </p>
    <p v-else class="card-header-title">
      No matches available in your range
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <figure>
        <img width="75%" v-bind:src="matchImage">
      </figure>
      <div class="columns">
        <a class="button column is-half" @click.prevent="likeMatch">LIKE</a>
        <a class="button column is-half" @click.prevent="">DISLIKE</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "profiles",
  data() {
    return {
      index: 0,
      currentMatch: null
    }
  },
  computed: {
    ...mapState([
      'user',
      'users'
    ]),
    getNextMatch() {
      this.getCurrentMatch()
      return this.currentMatch
    },
    matchImage() {
      if (this.currentMatch == null)
        return ("https://via.placeholder.com/150");
      else if (this.currentMatch.profile.propic == "" ||
        this.currentMatch.profile.propic == null)
        return ("https://via.placeholder.com/150");
      else
        return (this.currentMatch.profile.propic)
    }
  },
  methods: {
    ...mapMutations([
      'getMatches',
      'linkUsers'
    ]),
    getCurrentMatch() {
      if (this.users) {
        console.log("we already have our users")
        console.log(this.users.length)
        if (this.index < this.users.length) {
          this.currentMatch = this.users[this.index]
        }
      }
    },
    likeMatch() {
      if (this.currentMatch)
        if (!this.linkUsers(this.currentMatch))
          console.log("it worked")
        else
          console.log("It did not work")
      this.index++
    }
  },
  mounted() {
    this.getMatches()
    this.getCurrentMatch()
  }
}
</script>

<style scoped>
</style>
