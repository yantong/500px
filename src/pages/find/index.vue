<template>
  <view class="find">
    <nav-bar>
      <template #title>
        <text>发现</text>
      </template>
    </nav-bar>
    <tabs :options="tabOptions" :flex="true" @change="selTab"></tabs>
    <scroll-view
      :scroll-y="true"
      class="imgs"
      @scroll="scroll"
      :scrollTop="scrollTop"
    >
      <img-grid :imgs="imgs" v-show="showImgGrid"></img-grid>
      <photograph-album
        v-show="curTab == '影集'"
        :datas="photographAlbums"
      ></photograph-album>
      <view v-show="!loadEnd" class="loading">
        <Image
          class="loading-icon"
          v-show="loading"
          :src="require('../../assets/img/loading.png')"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref, watchEffect, nextTick, computed } from "vue";
import NavBar from "../../components/nav.vue";
import tabs from "../../components/tabs.vue";
import imgGrid from "../../components/imgGrid.vue";
import photographAlbum from "../../components/photographAlbum.vue";
import api from "../../api/find";
import * as util from "../../util/index";

let tabOptions = ["热门", "排名上升", "新作", "编辑推荐", "影集", "专栏"];
let pageSize = 20;

let imgs = ref([]);
let photographAlbums = ref([]);
let loading = ref(false);
let loadEnd = ref(false);
let pageIndex = ref(1);
let curTab = ref("热门");
let scrollTop = ref(0);

function selTab(tab) {
  if (curTab.value == tab) return;

  curTab.value = tab;

  pageIndex.value = 1;
  loading.value = true;
  loadEnd.value = false;
  scrollTop.value = 0;

  if (showImgGrid.value) {
    imgs.value = [];
  } else if (curTab.value == "影集") {
    photographAlbums.value = [];
  }
}

let scroll = util.debounce((scrollData) => {
  let scrollView = Taro.createSelectorQuery().select(".imgs");

  scrollView
    .boundingClientRect((rect) => {
      let { scrollHeight, scrollTop } = scrollData.detail;
      let distance = scrollHeight / 3;

      if (scrollTop + rect.height + distance >= scrollHeight) {
        nextPage();
      }
    })
    .exec();
}, 200);

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
    影集: api.getYingji,
    专栏: api.getZhuanlan,
  };

  let res = await reqMap[curTab.value](pageIndex.value, pageSize);

  if (showImgGrid.value) {
    imgs.value = [...imgs.value, ...res.data];
  } else if (curTab.value == "影集") {
    photographAlbums.value = [...photographAlbums.value, ...res.data.data];
  }

  loading.value = false;

  if (showImgGrid.value) {
    loadEnd.value = !res.data.length;
  } else if (curTab.value == "影集") {
    loadEnd.value = !res.data.data.length;
  }
});

const showImgGrid = computed(() => {
  return ["热门", "排名上升", "新作", "编辑推荐"].includes(curTab.value);
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

    margin-top: 8px;

    @keyframes loading {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 48px;

      .loading-icon {
        width: 32px;
        height: 32px;

        animation: loading 0.75s linear infinite;
      }
    }
  }
}
</style>
