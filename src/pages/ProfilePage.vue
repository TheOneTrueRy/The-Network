<template>
  <div v-if="profile" class="container-fluid">
    <div class="row px-5 py-2">
      <div class="col-12 elevation-2 my-grey">
        <div class="row">
          <div class="col-12 g-0">
            <img :src="profile.coverImg" alt="" class="coverImg">
          </div>
          <div class="col-12 d-flex justify-content-between secretsauce align-items-center">
            <div>
              <img id="pfp" :src="profile.picture" :alt="profile.name" class="rounded-circle" height="180" width="180">
            </div>
            <div>
              <a v-if="profile.github" :href="profile.github">
                <i class="mdi mdi-github fs-2 me-3 iconsauce"></i>
              </a>
              <a v-if="profile.linkedin" :href="profile.linkedin">
                <i class="mdi mdi-linkedin fs-2 me-3 iconsauce"></i>
              </a>
              <a v-if="profile.resume" :href="profile.resume">
                <i class="mdi mdi-note-text-outline me-2 fs-2 iconsauce"></i>
              </a>
            </div>
          </div>
          <div class="col-12 g-0 px-3">
            <span class="fs-5">{{ profile.class }}</span>
            <span v-if="profile.graduated" class=""> - <i class="">Graduated</i></span>
          </div>
          <div class="col-12 g-0 px-3">
            <span class="fs-4"><b>{{ profile.name }}</b></span>
          </div>
          <div class="col-12 g-0 mb-3 px-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from '../services/ProfilesService.js'
import Pop from "../utils/Pop.js";

export default {
  setup(){
    const route = useRoute();
    const profileId = route.params.profileId
    const profile = AppState.profile
    async function getProfileById(){
      try {
        await profilesService.getProfileById(profileId)
      } catch (error) {
        Pop.error(error, 'Getting Profile By Id')
      }
    }

    async function getPostsByCreatorId(){
      try {
        await postsService.getPostsByQuery({creatorId: profileId})
      } catch (error) {
        Pop.error(error, 'Getting Posts by CreatorId')
      }
    }

    onMounted(() => {
      getProfileById()
      getPostsByCreatorId()
    })

    onUnmounted(() => {
      profilesService.clearProfile()
      postsService.clearPosts()
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>


<style lang="scss" scoped>
.secretsauce{
  transform: translateY(-7vh);
}

.iconsauce{
  cursor: pointer;
}

.iconsauce:hover{
  animation-name: rainbow;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}

.coverImg{
  width: 100%;
  height: 30vh;
  overflow-y: hidden;
}

#pfp{
  border: 2px solid black;
}
</style>