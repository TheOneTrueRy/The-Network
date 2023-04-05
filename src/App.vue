<template>
<div class="container-fluid bg-dark bg-gradient">
  <div class="row vh100">
    <div class="col-2 g-0 d-flex align-items-center justify-content-center border-end border-dark border-3 my-grey bg-gradient">
      <div class="row h-100">
        <div class="col-12 d-flex align-items-center justify-content-center top pt-2">
          <img src="https://cdn.ebaumsworld.com/mediaFiles/picture/718392/84890860.jpg" alt="account photo" height="150" width="150" class="rounded-circle border border-2 border-dark elevation-1" />
        </div>
        <div class="col-12 text-center">
          <span class="fs-3">Mr. Placeholder</span>
        </div>
        <div class="col-12 middle pt-1">
          <div>
            <div class="text-center d-flex flex-column">
                <i class="mdi mdi-github me-2 fs-2"></i>
                <span class="on-hover fs-4">GitHub</span>
              </div>
              <div class="text-center d-flex flex-column mt-3">
                <i class="mdi mdi-linkedin me-2 fs-2"></i>
                <span class="on-hover fs-4">Linkedin</span>
              </div>
              <div class="text-center d-flex flex-column mt-3">
                <i class="mdi mdi-note-text-outline fs-2"></i>
                <span class="on-hover fs-4">Resume</span>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-10">
      <div class="row">
        <div class="col-12 g-0 border-3 border-bottom border-dark header-stuff">
          <Navbar/>
        </div>
        <div class="col-10 g-0 border-3 border-end border-dark main-body">
          <router-view/>
        </div>
        <div id="ads" class="col-2 g-0 d-flex flex-column">
          <marquee behavior="slide" direction="left">
            <Ad/>
          </marquee>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<!-- <router-view /> -->
<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Ad from "./components/Ad.vue"
import Login from "./components/Login.vue"
import Navbar from './components/Navbar.vue'
import { AuthService } from "./services/AuthService.js"

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      async logout() {
          AuthService.logout({ returnTo: window.location.origin })
      },
    }
  },
  components: { Navbar, Ad, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.top{
  height: 30vh;
}

.middle{
  height: 50vh;
}

.bottom{
  height: 10vh;
}

.header-stuff{
  height: 9vh;
}

.main-body{
  height: 91vh;
}

a{
  color: white;
}

a:hover{
  color: white;
}

#ads{
  height: 91vh;
}
</style>
