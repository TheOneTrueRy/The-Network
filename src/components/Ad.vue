<template>
  <div class="ads">
    <a href="https://www.tiktok.com/@theonetruery">
      <img :src="ads[0].tall" alt="" class="elevation-1 ad">
    </a>
  </div>
  <div class="ads">
    <a href="https://www.youtube.com/channel/UCf3zHtMcYZfqyn4IQ7k0kAw">
      <img :src="ads[1].tall" alt="" class="elevation-1 ad">
    </a>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { adsService } from "../services/AdsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup(){
    async function getAds(){
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error, 'Getting Ads')
      }
    }

    onMounted(() => {
      getAds()
    })
    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>


<style lang="scss" scoped>
  .ad{
    height: 100%;
    width: 100%
  }

  .ads{
    height: 50%;
  }
</style>