<template>
  <view class="img-grid" :style="{ height: contanierHeight + 'px' }">
    <Image
      v-for="item in displayImg"
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

const windowWidth = Taro.getWindowInfo().windowWidth;
const defHeight = 100;

let props = defineProps(["imgs"]);

let displayImg = ref([]);
let gutter = ref(10);
let contanierHeight = ref(0);

watch(
  () => {
    return props.imgs;
  },
  (imgs) => {
    if (imgs.length) {
      displayImg.value = calcImgs(imgs);
    } else {
      displayImg.value = [];
      contanierHeight.value = 0;
    }
  }
);

function calcImgs(imgs) {
  let calculatingImgs = imgs.map((img) => {
    return setImgDefault(img);
  });
  let saveImgs = [];
  let sumHeight = 0;

  calculatingImgs.forEach((img) => {
    saveImgs.push(img);

    let { sumWidth, usedWidth } = getSumWidthAndUsedWidth(saveImgs);

    if (sumWidth > usedWidth) {
      let bottom = setImgsPos(
        saveImgs.splice(0, saveImgs.length - 1),
        sumHeight
      );

      sumHeight = bottom + gutter.value;
    }
  });

  contanierHeight.value = setImgsPos(saveImgs, sumHeight, true);

  return calculatingImgs;
}

function setImgDefault(img) {
  let { width, height } = img;

  img.WHRate = height ? width / height : 0;
  img.widthDispaly = 0;
  img.heightDisplay = 0;
  img.left = 0;
  img.top = 0;

  return img;
}

function getSumWidthAndUsedWidth(imgs) {
  let sumWidth = imgs.reduce((total, item) => {
    return item.WHRate * defHeight + total;
  }, 0);
  let usedWidth = windowWidth - (imgs.length + 1) * gutter.value;

  return {
    sumWidth,
    usedWidth,
  };
}

function setImgsPos(imgs, topPos, isDefault) {
  imgs.forEach((item, index) => {
    if (isDefault) {
      item.widthDispaly = item.WHRate * defHeight;
      item.heightDisplay = defHeight;
    } else {
      let { sumWidth: sumWidthSaveImgs, usedWidth: usedWidthSaveImgs } =
        getSumWidthAndUsedWidth(imgs);

      item.widthDispaly =
        usedWidthSaveImgs * ((item.WHRate * defHeight) / sumWidthSaveImgs);
      item.heightDisplay = item.widthDispaly / item.WHRate;
    }

    item.left =
      index == 0
        ? gutter.value
        : imgs[index - 1].left + imgs[index - 1].widthDispaly + gutter.value;
    item.top = topPos;
  });

  return imgs[0].top + imgs[0].heightDisplay;
}
</script>

<style lang="scss">
.img-grid {
  position: relative;

  padding: 0 10px;
}
</style>
