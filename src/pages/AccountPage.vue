<template>
  <div class="my-overflow-form">
    <div id="coverImg" class="about text-center pb-2">
      <h1 class="my-shadow">Welcome, {{ account.name }}.</h1>
    <img class="rounded-circle" :src="account.picture" alt="" height="200" width="200"/>
  </div>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="editAccount()" class="">
      <label for="name" class="mt-2">Name</label>
      <input required v-model="editable.name" class="form-control  mb-2" type="text" placeholder="Name..." id="name">
      <label for="picture">Profile Picture</label>
      <input v-model="editable.picture" type="url" class="form-control  mb-2" placeholder="Img URL..." id="picture">
      <label for="github">GitHub Profile</label>
      <input v-model="editable.github" type="url" class="form-control  mb-2" id="github" placeholder="GitHub URL...">
      <label for="linkedin">Linkedin Profile</label>
      <input v-model="editable.linkedin" type="url" id="linkedin" class="form-control  mb-2" placeholder="Linkedin URL...">
      <label for="coverImg">Cover Image</label>
      <input v-model="editable.coverImg" type="url" id="coverImg" class="form-control  mb-2" placeholder="Img URL...">
      <label for="resume">Resume Link</label>
      <input v-model="editable.resume" type="url" class="form-control  mb-2" id="resume" placeholder="Link to Resume...">
      <label for="class">Class</label>
      <input v-model="editable.class" type="text" id="class" placeholder="Class Name/Year..." class="form-control mb-2">
      <input v-model="editable.graduated" :checked="editable.graduated" type="checkbox" id="graduated" class="form-check-input mb-2 s-5 me-2 text-center">
      <label for="graduated" class="">Graduated?</label>
      <button type="submit" class="btn btn-outline-light w-100 mt-1">Save Changes</button>
    </form>
  </div>
</div>
</template>

<script>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    const editable = ref({})
    function setCoverImg(){
      document.getElementById('coverImg').style.backgroundImage = `url('${AppState.account?.coverImg}')`
    }

    onMounted(() => {
      setCoverImg()
    })
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
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
.my-shadow{
  text-shadow: 2px 1px 4px black;
}

#coverImg{
  background-size: cover;
}

.my-overflow-form{
  overflow-y: scroll;
  height: 91vh;
}

.my-overflow-form::-webkit-scrollbar{
  display: none;
}
</style>
