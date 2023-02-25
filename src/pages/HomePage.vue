<template>
<div class="container-fluid h-100">
  <div id="WHAT" class="row">
    <div class="col-6 offset-3 post-area mt-2 border rounded border-dark border-2 elevation-2">
      <div class="row" v-if="account.id">
        <div class="col-4 pt-3 ps-4 d-flex flex-column">
          <img :src="account.picture" alt="" class="rounded-circle elevation-2" height="100" width="100">
        </div>
        <div class="col-8">
          <form>
            <textarea v-model="editable.body" required name="postbody" id="postbody" rows="4" class="mt-3 border-2 border border-dark" placeholder="Create a post!" maxlength="1200"></textarea>
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
        <div v-for="post in posts" class="col-10 offset-1 my-2 rounded border border-dark border-2 elevation-1">
          <div class="row">
            <div class="col-1 pt-1 text-center">
              <img :src="post.creator.picture" alt="" class="rounded-circle ms-2" height="50" width="50">
            </div>
            <div class="col-10 pe-1 pt-1 d-flex flex-column align-items-start">
              <span><b>{{post.creator.name}}</b></span>
              <span>{{ post.createdAt }}</span>
            </div>
            <div class="col-12 px-5 my-2">
              <span>{{ post.body }}</span>
            </div>
            <div v-if="post.imgUrl" class="col-12 text-center g-0">
              <img :src="post.imgUrl" alt="" class="bodyImg">
            </div>
            <div class="col-12 text-end">
              <i class="mdi mdi-arrow-up fs-4 me-1 like"></i>
              <span class="fs-4 me-4">{{ post.likes.length }}</span>
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
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from '../services/PostsService.js';
import { adsService } from '../services/AdsService.js';
import Pop from "../utils/Pop.js";

export default {
  setup() {
    let editable = ref({})
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
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">

@keyframes rainbow{
  0% {color: red}
  15% {color: orange;}
  30% {color: yellow;}
  38% {color: rgb(187, 255, 0);}
  45% {color: lime}
  60% {color: blue}
  75% {color: darkviolet}
  90% {color: deeppink;}
  100% {color: red;}
}

.btn-col{
  height: 6%;
}

.like{
  transition: 0.5s;
  cursor: pointer;
}

.like:hover{
  animation-name: rainbow;
  animation-iteration-count: infinite;
  animation-duration: 5s;
  transform: scale(1.1);
}

.post-area{
  height: 20%;
}

.my-overflow{
  height: 80%;
  overflow-y: scroll;
}

.my-overflow::-webkit-scrollbar{
  display: none;
}

.bodyImg{
  width: 100%;
  height: 500px;
}

#postbody{
  width: 90%;
}

#postbutton{
  height: 34px;
  border: 2px solid black;
  padding: 4px 6px;
  margin-bottom: 3px;
}

#WHAT{
  height: 99%;
}
</style>
