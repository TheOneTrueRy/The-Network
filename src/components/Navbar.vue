<template>
  <div class="d-flex align-items-center justify-content-between ps-2 my-grey bg-gradient h-100">
    <router-link :to="{ name: 'Home' }" @click="resetPosts()">
      <div class="" title="Return to Homepage">
        <img alt="logo" src="https://cdn-icons-png.flaticon.com/512/3600/3600934.png" class="rounded-circle elevation-1" height="64"/>
        <span class="fs-3 ms-1 brand-text on-hover">ETWORK</span>
      </div>
    </router-link>
    <div>
      <form class="flex-row d-flex" @submit.prevent="search()">
        <input v-model="editable.query" type="text" class="me-1 form-control" placeholder="Search...">
        <button class="btn btn-outline-dark me-4">
          <i class="mdi mdi-magnify"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { router } from "../router.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async search(){
        try {
          let searchData = editable.value
          await postsService.search(searchData)
          editable.value = {}
        } catch (error) {
          Pop.error(error, 'Searching Posts')
        }
      },
      async resetPosts(){
        await postsService.getAllPosts()
      }
    }
  },
}
</script>

<style scoped>

.brand-text{
  font-weight: 1000;
  color: white;
  text-shadow: 4px 3px black;
  font-family: 'Roboto Slab', serif;
  letter-spacing: 2px;
}

</style>
