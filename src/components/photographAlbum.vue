<template>
  <view class="photograph-album"></view>
</template>

<script setup>
import { watch, ref } from "vue";

let props = defineProps(["datas"]);

let albums = ref([]);

watch(
  () => {
    return props.datas;
  },
  (datas) => {
    albums.value = [...datas];
  }
);
</script>

<style lang="scss">
.photograph-album {
}
</style>
