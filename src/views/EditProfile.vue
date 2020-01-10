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
            <div class="file has-name is-centered">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/*" name="resume" @change="fileChange" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Upload a profile picture…
                  </span>
                </span>
                <span class="file-name" v-if="filename != ''">
                  <p class="subtitle is-warning">Profile</p>
                </span>
              </label>
            </div>
            <br />
            <br />
            <a v-if="filename != ''" class="button is-medium is-fullwidth is-primary is-outlined" @click="changepropic">Change Profile Picture</a>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-centered">Change First Name</label>
          <div class="control">
            <input v-if="user" class="input" type="text" v-model="fname" v-bind:placeholder="user.fname"/>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-centered">Change Last Name</label>
          <div class="control">
            <input v-if="user" class="input" type="text" v-model="lname" v-bind:placeholder="user.lname"/>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-centered">Change Username</label>
          <div class="control">
            <input v-if="user" class="input" type="text" v-model="username" v-bind:placeholder="user.username"/>
            <p class="is-3 is-danger" v-if="username != ''">Changing username will affect your login credentials</p>
          </div>
        </div>
        <div class="field">
          <label class="label has-text-centered">Add a new tag</label>
          <div class="control">
            <input class="input" type="text" v-model="interests" placeholder="insert new interest here">
          </div>
        </div>
        <!-- tags are displayed here -->
        <div class="tags" v-if="user.profile.interests">
          <span class="tag is-info" v-for="(interest, id) in user.profile.interests">
            {{ interest }}
            <a class="delete is-small" @click.prevent="deleteInterest(id)"></a>
          </span>
        </div>
        <div class="field">
          <label class="label has-text-centered">Choose Sex</label>
          <div class="control">
            <div class="select">
              <select v-model="userSex">
                <option disabled value="">Please select one</option>
                <option v-for="sex in sexes">{{ sex }}</option>
              </select> 
            </div>
            <p class="subtitle" v-if="user.sex != ''">{{ user.sex }}</p>
          </div>
          <div class="field">
            <label class="label has-text-centered">What is your sexual orientation</label>
            <div class="control">
              <div class="select">
                <select v-model="looking">
                  <option disabled value="">Please select one</option>
                  <option v-for="orientation in orientations">{{ orientation }}</option>
                </select>
              </div>
              <p class="subtitle" v-if="user.profile.orientation">{{ user.profile.orientation }}</p>
            </div>
          </div>
        </div>
        <div class="buttons is-centered">
          <a class="button is-info" href="#" @click.prevent="updateUserDetails">Submit Changes</a>
        </div>
      </form>
    </div>
    <div class="column is-half">
      <h1 class="title has-text-centered">{{ user.username }} Images</h1>
        <!-- We upload images to the gallery through this file input -->
        <div class="file is-success is-centered" v-if="user.profile.images.length < 4">
          <label class="file-label">
            <input class="file-input" type="file" accept="image/*" name="gallery_file" @change="loadPreview">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Upload to image gallery
              </span>
            </span>
          </label>
        </div>
        <br />
        <div class="columns">
          <div class="column is-full" style="overflow-y: auto;">
            <!-- insert cool, amazing and unbelievably dope code here -->
            <div class="card is-centered" v-if="preview != ''">
              <div class="card-image">
                <figure class="image is3by3">
                  <img v-bind:src="preview" alt="preview image">
                </figure>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item" v-on:click.prevent="delPreview">Delete</a>
                <a href="#" class="card-footer-item" v-on:click.prevent="addToGallery">Save</a>
              </footer>
            </div>
            <div class="card is-centered" v-for="(image, index) in user.profile.images">
              <div class="card-image">
                <figure class="image is3by3">
                  <img v-bind:src="image" alt="user gallery image">
                </figure>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item" v-on:click.prevent="galleryDelete(index)">Delete</a>
              </footer>
            </div>
            <br v-for="image in user.profile.images"/>
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
      username: '',
      fname: '',
      lname: '',
      interests: '',
      image: 'https://bulma.io/images/placeholders/128x128.png',
      preview: '',
      placeholderImage: 'https://via.placeholder.com/150?Text=Digital.com',
      filename: '',
      userSex: '',
      orientations: ['pansexual', 'heterosexual', 'homosexual', 'bisexual'],
      looking: '',
      sexes: ['Male', 'Female', 'Non-Binary', 'Transgender Woman', 'Transgender Man']
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'getUserData',
      'spliceInterests'
    ]),
    fileChange(e) {
      console.log("Got here")
      let reader = new FileReader()
      if (!e.target.files.length)
        return
      if (e.target.files[0].type.split('/')[0] == "image") {
        reader.readAsDataURL(e.target.files[0])
        this.filename = e.target.files[0].name
        reader.onload = (e) => {
          this.image = e.target.result
        }
      }
    },
    updateUserDetails(){
      let user = this.user
      if (this.looking != '')
        user.profile.orientation = this.looking
      if (this.userSex != '')
        user.sex = this.userSex
      if (this.interests != '')
        user.profile.interests = [...user.profile.interests, this.interests]
      if (this.fname != '')
        user.fname = this.fname
      if (this.lname != '')
        user.lname = this.lname
      this.interests = ''
      this.looking = ''
      this.userSex = ''
      this.fname = ''
      this.lname = ''
      axios.post('http://localhost:4040/users/update', user)
        .then(resp => {
          return resp.data
        })
        .then(data => {
          this.getUserData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    changepropic(){
      console.log("saving propic")
      let user = this.user
      user.profile.propic = this.image
      axios.post('http://localhost:4040/users/update', user)
        .then(resp => {
          return resp.data
        })
        .then(data => {
          this.getUserData()
          this.filename = ''
        })
    },
    loadPreview(e) {
      let reader = new FileReader()
      if (!e.target.files.length)
        return
      if (e.target.files[0].type.split('/')[0] == "image") {
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.preview = e.target.result
        }
      }
    },
    delPreview() {
      this.preview = ''
    },
    deleteInterest(id){
      this.spliceInterests(id)
    },
    galleryDelete(key){
      let user = this.user
      user.profile.images.splice(key, 1)
      axios.post('http://localhost:4040/users/update', user)
        .then(resp => {
          return resp.data
        })
        .then(data => {
          this.getUserData()
        })
    },
    addToGallery(){
      let user = this.user
      user.profile.images.push(this.preview)
      console.log("adding image to gallery")
      axios.post('http://localhost:4040/users/update', user)
      .then(resp => {
        this.preview = ''
        return resp.data
      }).then(data => {
        if (data.success) {
          this.preview = ''
          this.getUserData()
        }
      }).catch(err => {
        console.log(err)
      })
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
