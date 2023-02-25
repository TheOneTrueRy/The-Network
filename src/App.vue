<template>
<div class="container-fluid">
  <div class="row vh100">
    <div class="col-2 g-0 d-flex align-items-center justify-content-center border-end border-dark border-2">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <Login/>
        </div>
        <div class="col-12 third">

        </div>
        <div class="col-12 third">

        </div>
      </div>
    </div>
    <div class="col-10">
      <div class="row">
        <div class="col-12 g-0 border-bottom border-2 border-dark header-stuff">
          <Navbar/>
        </div>
        <div class="col-10 g-0 border-2 border-end border-dark main-body">
          <router-view/>
        </div>
        <div class="col-2 g-0">

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
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.third{
  height: 33.3vh;
}

.header-stuff{
  height: 7vh;
}

.main-body{
  height: 93vh;
}
</style>
