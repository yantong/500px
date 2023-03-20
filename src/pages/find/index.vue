<template>
  <view class="find">
    <nav-bar>
      <template #title>
        <text>发现</text>
      </template>
    </nav-bar>
    <tabs :options="tabOptions" :flex="true"></tabs>
    <div class="content">
      <Image
        v-for="(item, index) in imgs"
        :key="item.url.p2"
        :src="item.url.p2"
        mode="aspectFill"
      />
    </div>
  </view>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../../components/nav.vue";
import tabs from "../../components/tabs.vue";
import api from "../../api/find";

let tabOptions = ["热门", "排名上升", "新作", "编辑推荐", "影集", "专栏"];
let imgs = ref([]);

let getImg = async () => {
  let res = await api.getRemen();

  imgs.value = res.data;

  console.log(res.data);
};

getImg();
</script>

<style lang="scss">
.find {
}
</style>
