<template>
  <view class="find">
    <nav-bar>
      <template #title>
        <text>发现</text>
      </template>
    </nav-bar>
    <tabs :options="tabOptions" :flex="true" @change="selTab"></tabs>
    <scroll-view :scroll-y="true" class="imgs" @scrolltolower="nextPage">
      <img-grid :imgs="imgs" :key="curTab"></img-grid>
      <view v-show="!loadEnd" class="loading"><text>正在加载...</text></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import NavBar from "../../components/nav.vue";
import tabs from "../../components/tabs.vue";
import imgGrid from "../../components/imgGrid.vue";
import api from "../../api/find";

let tabOptions = ["热门", "排名上升", "新作", "编辑推荐", "影集", "专栏"];
let pageSize = 20;

let imgs = ref([]);
let loading = ref(false);
let loadEnd = ref(false);
let pageIndex = ref(1);
let curTab = ref("热门");

function selTab(tab) {
  curTab.value = tab;

  pageIndex.value = 1;
  imgs.value = [];

  loading.value = true;
  loadEnd.value = false;
}

function nextPage() {
  if (loading.value || loadEnd.value) return;

  loading.value = true;
  pageIndex.value++;
}

watchEffect(async () => {
  let reqMap = {
    热门: api.getRemen,
    排名上升: api.getPaiming,
    新作: api.getXinzuo,
    编辑推荐: api.getTuijian,
    影集: api.getRemen,
    专栏: api.getRemen,
  };

  let res = await reqMap[curTab.value](pageIndex.value, pageSize);

  imgs.value = [...imgs.value, ...res.data];

  loading.value = false;
  loadEnd.value = !res.data.length;
});
</script>

<style lang="scss">
.find {
  display: flex;
  flex-direction: column;

  height: 100%;

  background: #f7f8fa;

  .imgs {
    height: 0;
    flex: 1;

    margin-top: 10px;

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;

      // background: #edeef1;

      height: 80px;
      font-size: 32px;
    }
  }
}
</style>
