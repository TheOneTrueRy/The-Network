<template>
  <div v-if="profile" class="container-fluid">
    <div class="row">

    </div>
  </div>
</template>


<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import { profilesService } from '../services/ProfilesService.js'
import Pop from "../utils/Pop.js";

export default {
  setup(){
    const route = useRoute();
    const profileId = route.params.profileId
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
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>