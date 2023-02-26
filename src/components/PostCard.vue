<template>
          <div class="row">
            <div class="col-1 pt-1 text-center">
              <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
                <img :src="post.creator.picture" alt="" class="rounded-circle ms-2" height="50" width="50" onerror="this.src='src/assets/img/broken-image.png';">
              </router-link>
            </div>
            <div class="col-10 pe-1 pt-1 d-flex flex-column align-items-start">
              <span><b>{{post.creator.name}}</b></span>
              <span>{{ post.createdAt }}</span>
            </div>
            <div class="col-12 px-5 my-2">
              <span>{{ post.body }}</span>
            </div>
            <div v-if="post.imgUrl" class="col-12 text-center g-0">
              <img :src="post.imgUrl" alt="" class="img-fluid bodyImg" onerror="this.src='src/assets/img/broken-image.png';">
            </div>
            <div class="col-12 d-flex align-items-center justify-content-between">
              <div class="my-1">
                <button type="button" v-if="post.creator.id == account.id" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
              </div>
              <div>
                <i class="mdi mdi-arrow-up fs-4 me-1 like" @click="likePost(post.id)"></i>
                <span class="fs-4 me-4">{{ post.likes.length }}</span>
              </div>
            </div>
          </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";

export default {
  props: {
    post: {type: Post, required: true}
  },
  setup(){

    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      async likePost(postId){
        await postsService.likePost(postId)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>