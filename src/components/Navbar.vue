<template>
  <div class="d-flex align-items-center ps-2 navbar-custom">
        <router-link :to="{ name: 'Home' }">
        <div class="text-center" title="Return to Homepage">
          <img alt="logo" src="../assets/img/letter-n.png" height="64"/>
          <i class="on-hover"><span class="fs-3 ms-1 brand-text">The Network</span></i>
        </div>
      </router-link>
      </div>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.navbar-custom{
  background: rgb(29,203,249);
  background: linear-gradient(280deg, rgba(29,203,249,1) 0%, rgba(171,235,242,1) 100%);
}

.brand-text{
  font-weight: bold;
  color: white;
  -webkit-text-stroke: 1px black;
  font-family: 'Fredoka One', cursive;
}

</style>
