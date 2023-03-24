<template>
  <view
    class="nav"
    :style="{
      height: navHeight + 'px',
      paddingTop: statusHeight + 'px',
    }"
  >
    <view
      class="left"
      :style="{
        height: navHeight + 'px',
      }"
    >
      <slot name="left"></slot>
    </view>
    <view
      class="title"
      :style="{
        height: navHeight + 'px',
      }"
    >
      <slot name="title"></slot>
    </view>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";

const { height, top: statusHeight } = Taro.getMenuButtonBoundingClientRect();

const navPaddingBottom = 5;
const navHeight = height + navPaddingBottom;
</script>

<style lang="scss">
.nav {
  position: relative;

  .left {
    position: absolute;
    width: 100%;

    display: flex;
    align-items: center;
  }

  .title {
    position: absolute;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
  }
}
</style>
