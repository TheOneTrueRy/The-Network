<template>
  <span>
    <button class="btn selectable border border-dark border-2 rounded text-uppercase my-2 my-lg-0 special-font" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0 d-flex justify-content-center">
        <div type="button" class="bg-dark border-0 selectable no-select rounded-circle elevation-2 pfp" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account.picture || user.picture" class="">
            <img :src="account.picture || user.picture" alt="account photo" height="150" width="150" class="rounded-circle" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item bg-dark bg-gradient list-group-item-action text-light border-1 border-dark">
                Edit Account
              </div>
            </router-link>
            <router-link v-if="account.id" :to="{ name: 'Profile', params: {profileId: account.id || user.id} }" @click="setProfileRight()">
              <div class="list-group-item dropdown-item list-group-item-action bg-dark bg-gradient text-light border-1 border-dark">
                My Profile
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <span class="fs-3 special-font name">{{ account.name || user.name }}</span>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { profilesService } from "../services/ProfilesService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async setProfileRight(){
        try {
          await profilesService.getProfileById(this.account.id)
        } catch (error) {
          Pop.error(error, 'Setting Profile Right')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.name{
  color: white;
  -webkit-text-stroke: 1px black;
  letter-spacing: 2.5px;
}

.pfp{
  height: 150px;
  width: 150px;
}
</style>
