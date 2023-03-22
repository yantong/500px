<template>
  <view class="img-grid" :style="{ height: contanierHeight + 'px' }">
    <Image
      v-for="(item, index) in displayImg"
      lazyLoad
      mode="aspectFill"
      :key="item.url.p1"
      :src="item.url.p1"
      :style="{
        position: 'absolute',
        width: item.widthDispaly + 'px',
        height: item.heightDisplay + 'px',
        left: item.left + 'px',
        top: item.top + 'px',
      }"
      :class="{
        unResize: item.unResize,
      }"
    />
  </view>
</template>

<script setup>
import { watch, ref } from "vue";
import Taro from "@tarojs/taro";

let props = defineProps(["imgs"]);
let displayImg = ref([]);
let gutter = ref(10);
let contanierHeight = ref(0);

function calcImgs(imgs) {
  const windowWidth = Taro.getWindowInfo().windowWidth;

  let defHeight = 100;
  let saveImgs = [];
  let sumHeight = 0;

  for (let index = 0; index < imgs.length; index++) {
    let imgCur = imgs[index];
    let { width, height } = imgCur;

    if (height == 0) {
      imgCur.widthDispaly = 0;
      imgCur.heightDisplay = 0;
      imgCur.left = 0;
      imgCur.top = 0;

      continue;
    }

    imgCur.rate = width / height;

    if (saveImgs.length) {
      let sumImgs = [...saveImgs, imgCur];
      let sumWidth = sumImgs.reduce((total, item) => {
        return item.rate * defHeight + total;
      }, 0);
      let usedWidth = windowWidth - (sumImgs.length + 1) * gutter.value;

      if (sumWidth >= usedWidth) {
        let sumWidthSaveImgs = saveImgs.reduce((total, item) => {
          return item.rate * defHeight + total;
        }, 0);
        let usedWidthSaveImgs =
          windowWidth - (saveImgs.length + 1) * gutter.value;

        saveImgs.forEach((item, index) => {
          item.widthDispaly =
            usedWidthSaveImgs * ((item.rate * defHeight) / sumWidthSaveImgs);
          item.heightDisplay = item.widthDispaly / item.rate;

          item.left =
            index == 0
              ? gutter.value
              : saveImgs[index - 1].left +
                saveImgs[index - 1].widthDispaly +
                gutter.value;
          item.top = sumHeight;
        });

        sumHeight += gutter.value + saveImgs[0].heightDisplay;

        saveImgs = [];
      }
    }

    saveImgs.push(imgCur);

    if (index === imgs.length - 1) {
      saveImgs.forEach((item, index) => {
        item.widthDispaly = item.rate * defHeight;
        item.heightDisplay = defHeight;

        item.left =
          index == 0
            ? gutter.value
            : saveImgs[index - 1].left +
              saveImgs[index - 1].widthDispaly +
              gutter.value;
        item.top = sumHeight;
      });

      contanierHeight.value = sumHeight + defHeight;
    }
  }
}

watch(
  () => {
    return props.imgs;
  },
  (imgs) => {
    let imgsCopy = [...props.imgs];

    calcImgs(imgsCopy);

    displayImg.value = [...imgsCopy];
  }
);
</script>

<style lang="scss">
.img-grid {
  position: relative;

  padding: 0 10px;
}
</style>
