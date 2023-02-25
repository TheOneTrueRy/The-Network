<template>

</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup(){

    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>