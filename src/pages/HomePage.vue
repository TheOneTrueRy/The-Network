<template>
<div class="container-fluid h-100">
  <div class="row h-100">
    <div class="col-12">

    </div>
    <div class="col-12 my-overflow">
      <div class="row">
        <div v-for="post in posts" class="col-10 offset-1 p-1 my-3 rounded border border-dark border-2">
          <div class="row">
            <div class="col-1 ps-1">
              <img :src="post.creator.picture" alt="" class="rounded-circle ms-2" height="50" width="50">
            </div>
            <div class="col-10 pe-1 d-flex flex-column align-items-start">
              <span><b>{{post.creator.name}}</b></span>
              <span>2h</span>
            </div>
            <div class="col-12 px-5 my-2">
              <span>{{ post.body }}</span>
            </div>
            <div v-if="post.imgUrl" class="col-12 text-center">
              <img :src="post.imgUrl" alt="" class="bodyImg">
            </div>
            <div class="col-12 text-end">
              <i class="mdi mdi-arrow-up"></i>
              <span>69</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2 d-flex align-items-center justify-content-around btn-col">
          <button class="btn btn-outline-dark"><i class="mdi mdi-arrow-left"></i> Newer Pages</button>
          <button class="btn btn-outline-dark">Older Pages <i class="mdi mdi-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from '../services/PostsService.js';
import Pop from "../utils/Pop.js";

export default {
  setup() {

    async function getAllPosts(){
      try {
        await postsService.getAllPosts()
      } catch (error) {
        Pop.error(error, 'Getting All Posts')
      }
    }

    onMounted(() => {
      getAllPosts()
    })

    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-col{
  height: 6%;
}

.my-overflow{
  height: 90vh;
  overflow-y: scroll;
}

.my-overflow::-webkit-scrollbar{
  display: none;
}

.bodyImg{
  width: 60%;
  height: 400px;
}
</style>
