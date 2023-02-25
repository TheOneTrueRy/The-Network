<template>
  <div class="about text-center">
    <h1>Welcome, {{ account.name }}.</h1>
    <img class="rounded-circle" :src="account.picture" alt="" height="200" width="200"/>
    <p class="mt-3">{{ account.email }}</p>
  </div>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="editAccount()">
      <label for="name">Name</label>
      <input required v-model="editable.name" class="form-control mt-1 mb-3" type="text" placeholder="Name..." id="name">
      <label for="picture">Profile Picture</label>
      <input v-model="editable.imgUrl" type="url" class="form-control mt-1 mb-3" placeholder="Img URL..." id="picture">
      <label for="github">GitHub Profile</label>
      <input v-model="editable.github" type="url" class="form-control mt-1 mb-3" id="github" placeholder="GitHub URL...">
      <label for="linkedin">Linkedin Profile</label>
      <input v-model="editable.linkedin" type="url" id="linkedin" class="form-control mt-1 mb-3" placeholder="Linkedin URL...">
      <button type="submit" class="btn btn-outline-light w-100 mt-1">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount(){
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          Pop.error(error, 'Editing Account')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
