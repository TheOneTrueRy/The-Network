<template>
<div class="container-fluid search-overflow">
  <div id="topofposts"></div>
    <div class="row">
      <div v-for="post in posts" class="col-10 offset-1 my-2 rounded border border-dark border-2 elevation-1 my-grey bg-gradient card-glow">
        <PostCard :post="post"/>
      </div>
    </div>
</div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
    setup() {

        return {
          posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
}
</script>


<style lang="scss" scoped>

.search-overflow{
  height: 100%;
  overflow-y: scroll;
}

.search-overflow::-webkit-scrollbar{
  display: none;
}

</style>