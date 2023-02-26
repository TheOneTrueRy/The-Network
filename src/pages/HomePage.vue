<template>
<div class="container-fluid h-100">
  <div id="WHAT" class="row">
    <div class="col-6 offset-3 post-area my-2 border rounded border-dark border-2 elevation-2 my-grey bg-gradient">
      <div class="row" v-if="account.id">
        <div class="col-3 pt-3 ps-4 d-flex flex-column">
          <img :src="account.picture" alt="" class="rounded-circle elevation-2" height="100" width="100">
        </div>
        <div class="col-9">
          <form @submit.prevent="createPost()">
            <textarea v-model="editable.body" required name="postbody" id="postbody" rows="4" class="mt-2 border-2 border border-dark rounded" placeholder="Create a post!" maxlength="1200"></textarea>
            <input v-model="editable.imgUrl" type="url" class="rounded py-1" placeholder="Got an IMG? Put er there!">
            <button type="submit" id="postbutton" class="btn btn-outline-dark ms-5 py-1 like">Post!</button>
          </form>
        </div>
      </div>
      <div class="row h-100" v-else>
        <div class="col-12 d-flex justify-content-center align-items-center">
          <i><h1>Log-in to post!</h1></i>
        </div>
      </div>
    </div>
    <div class="col-12 my-overflow">
      <div class="row">
        <div v-for="post in posts" class="col-10 offset-1 my-2 rounded border border-dark border-2 elevation-1 my-grey bg-gradient card-glow">
          <PostCard :post="post"/>
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2 d-flex align-items-center justify-content-around btn-col">
          <button class="btn btn-outline-light" @click="changePage(newerPosts)" :disabled="!newerPosts"><i class="mdi mdi-arrow-left"></i> Newer Pages</button>
          <button class="btn btn-outline-light" @click="changePage(olderPosts)" :disabled="!olderPosts">Older Pages <i class="mdi mdi-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({})
    async function getAllPosts(){
      try {
        await postsService.getAllPosts()
      } catch (error) {
        Pop.error(error, 'Getting All Posts')
      }
    }

    async function getAds(){
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error, 'Getting Ads')
      }
    }

    onMounted(() => {
      getAllPosts()
      getAds()
    })

    return {
      editable,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),
      async createPost(){
        try {
          await postsService.createPost(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error, 'Creating Post')
        }
      },
      async changePage(url){
        try {
          if(AppState.query){
            await postsService.changePageWithQuery(url)
          }else{
            await postsService.changePage(url)
          }
        } catch (error) {
          Pop.error(error, 'Changing Page')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-glow{
  box-shadow: 1px 0.5px 7px rgb(187, 112, 187);
  transition: 0.5s;
}

.card-glow:hover{
  box-shadow: 1px 0.5px 11px rgb(187, 112, 187);
  transform: scale(1.01);
}
</style>
