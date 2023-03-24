<template>
  <view class="special-column">
    <view v-for="item in columns" :key="item.id" class="special-column-cells">
      <Image
        :src="item.url.p1"
        lazyLoad
        mode="aspectFill"
        class="special-column-img"
      ></Image>
      <view class="special-column-info">
        <view class="special-column-title">
          <text>{{ item.title }}</text>
        </view>
        <view class="special-column-tag">
          <text class="special-column-tag-text">{{ item.tag.join(",") }}</text>
        </view>
        <view class="special-column-bottom">
          <view class="special-column-uploaderInfo">
            <Image
              :src="item.uploaderInfo.avatar.a1"
              lazyLoad
              mode="aspectFill"
              class="special-column-avatar"
            ></Image>
            <text class="special-column-nickName">{{
              item.uploaderInfo.nickName
            }}</text>
          </view>
          <view class="special-column-picturePvCount">
            <text>{{ item.picturePvCount }}次阅读</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { watch, ref } from "vue";

let props = defineProps(["datas"]);

let columns = ref([]);

watch(
  () => {
    return props.datas;
  },
  (datas) => {
    columns.value = [...datas];
  }
);
</script>

<style lang="scss">
.special-column {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .special-column-cells {
    width: 340px;
    margin-top: 30px;
    background: white;

    .special-column-img {
      width: 340px;
      height: 240px;
    }

    .special-column-info {
      padding: 0 10px;

      .special-column-title {
        color: #525558;

        margin-top: 10px;
        text-align: center;
      }

      .special-column-tag {
        margin-top: 20px;
        text-align: center;

        .special-column-tag-text {
          display: inline-block;
          width: 68px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          height: 20px;
          line-height: 20px;
          border-radius: 100px;
          background-color: #eaebed;
          font-size: 12px;
          color: #525558;
          text-align: center;
        }
      }

      .special-column-bottom {
        margin: 20px 0;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .special-column-uploaderInfo {
          display: flex;
          align-items: center;

          .special-column-avatar {
            width: 30px;
            height: 30px;

            border-radius: 30px;
          }

          .special-column-nickName {
            margin-left: 10px;
            display: inline-block;
            position: relative;
            width: 160px;
            text-align: left;
            font-size: 14px;
            color: #71767a;
          }
        }

        .special-column-picturePvCount {
          font-size: 12px;
          color: #b8c1c8;
        }
      }
    }
  }
}
</style>
