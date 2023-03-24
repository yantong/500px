<template>
  <view class="photograph-album">
    <view v-for="item in albums" :key="item.id" class="cells">
      <view class="album-imgs">
        <Image
          v-for="photo in item.photos.slice(0, 4)"
          :key="photo.url.baseUrl"
          lazyLoad
          mode="aspectFill"
          class="img"
          :src="photo.url.baseUrl + '!p1'"
        ></Image>
      </view>
      <view class="bottom"
        ><text class="title">{{ item.title }}</text
        ><text class="setSetCount">{{ item.setSetCount }}件作品</text></view
      >
    </view>
  </view>
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .cells {
    margin-top: 30px;

    width: 343px;

    .album-imgs {
      height: 305px;

      display: flex;
      justify-content: space-between;
      align-content: space-between;
      flex-wrap: wrap;

      border-radius: 15px;
      overflow: hidden;

      .img {
        height: 150px;

        &:nth-child(1),
        &:nth-child(4) {
          width: 220px;
        }

        &:nth-child(2),
        &:nth-child(3) {
          width: 118px;
        }
      }
    }

    .bottom {
      margin-top: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #222;
        font-weight: 600;
        font-size: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        max-width: 70%;
      }

      .setSetCount {
        color: #6d7378;
        font-weight: 400;
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
}
</style>
