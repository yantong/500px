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
        v-show="curTab == YING_JI"
        :datas="photographAlbums"
      ></photograph-album>
      <special-column
        v-show="curTab == ZHUAN_LAN"
        :datas="specialColumns"
      ></special-column>
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
import specialColumn from "../../components/specialColumn.vue";
import api from "../../api/find";
import * as util from "../../util/index";

const RE_MEN = "热门";
const PAI_MIN_SHANG_SHENG = "排名上升";
const XIN_ZUO = "新作";
const BIAN_JI_TUI_JIAN = "编辑推荐";
const YING_JI = "影集";
const ZHUAN_LAN = "专栏";

let tabOptions = [
  RE_MEN,
  PAI_MIN_SHANG_SHENG,
  XIN_ZUO,
  BIAN_JI_TUI_JIAN,
  YING_JI,
  ZHUAN_LAN,
];
let curTab = ref(RE_MEN);

let imgs = ref([]);
let photographAlbums = ref([]);
let specialColumns = ref([]);

let pageIndex = ref(1);
let pageSize = 20;

let loading = ref(false);
let loadEnd = ref(false);

let scrollTop = ref(0);

function selTab(tab) {
  if (curTab.value == tab) return;

  curTab.value = tab;

  pageIndex.value = 1;
  loading.value = true;
  loadEnd.value = false;
  scrollTop.value = 0;

  imgs.value = [];
  photographAlbums.value = [];
  specialColumns.value = [];
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
    [RE_MEN]: api.getRemen,
    [PAI_MIN_SHANG_SHENG]: api.getPaiming,
    [XIN_ZUO]: api.getXinzuo,
    [BIAN_JI_TUI_JIAN]: api.getTuijian,
    [YING_JI]: api.getYingji,
    [ZHUAN_LAN]: api.getZhuanlan,
  };

  let res = await reqMap[curTab.value](pageIndex.value, pageSize);

  if (showImgGrid.value) {
    imgs.value = [...imgs.value, ...res.data];
  } else if (curTab.value == YING_JI) {
    photographAlbums.value = [...photographAlbums.value, ...res.data.data];
  } else if (curTab.value == ZHUAN_LAN) {
    specialColumns.value = [...specialColumns.value, ...res.data];
  }

  loadEnd.value =
    curTab.value == YING_JI ? !res.data.data.length : !res.data.length;
  loading.value = false;
});

const showImgGrid = computed(() => {
  return [RE_MEN, PAI_MIN_SHANG_SHENG, XIN_ZUO, BIAN_JI_TUI_JIAN].includes(
    curTab.value
  );
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
