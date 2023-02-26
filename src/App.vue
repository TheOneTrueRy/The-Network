<template>
<div class="container-fluid bg-dark bg-gradient">
  <div class="row vh100">
    <div class="col-2 g-0 d-flex align-items-center justify-content-center border-end border-dark border-3 my-grey bg-gradient">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center ">
          <Login title="Access Your Account Pages"/>
        </div>
        <div class="col-12 third pt-4">
          <div v-if="appState.account.id">
            <a v-if="appState.account.github" :href="appState.account.github" target="_blank">
            <div class="text-center d-flex flex-column">
                <i class="mdi mdi-github me-2 fs-2"></i>
                <span class="on-hover fs-4">GitHub</span>
              </div>
            </a>
            <a v-if="appState.account.linkedin" :href="appState.account.linkedin" target="_blank">
            <div class="text-center d-flex flex-column mt-3">
                <i class="mdi mdi-linkedin me-2 fs-2"></i>
                <span class="on-hover fs-4">Linkedin</span>
              </div>
            </a>
            <a v-if="appState.account.resume" :href="appState.account.resume" target="_blank">
              <div class="text-center d-flex flex-column mt-3">
                <i class="mdi mdi-note-text-outline fs-2"></i>
                <span class="on-hover fs-4">Resume</span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-12 third text-center">
          <button v-if="appState.account.id" class="btn btn-outline-danger mt-5" @click="logout">Logout <i class="mdi mdi-logout"></i></button>
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
          <Ad/>
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

.third{
  height: 33.3vh;
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
