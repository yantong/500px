<template>
  <view
    class="tabs"
    :class="{
      flex: flex,
    }"
  >
    <view
      v-for="(item, index) in options"
      :key="index"
      class="options"
      :class="{
        seled: selIndex == index,
      }"
      @click="
        selIndex = index;
        emit('change', item);
      "
    >
      <text>{{ item }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["options", "flex"]);
const emit = defineEmits(["change"]);

let selIndex = ref(0);
</script>

<style lang="scss">
.tabs {
  display: flex;
  align-items: center;

  &.flex {
    justify-content: space-around;
  }

  .options {
    flex-shrink: 0;

    padding: 16px 0;

    border-bottom: 6px solid transparent;

    font-size: 28px;
    font-weight: 700;
    color: #71767a;

    &.seled {
      border-color: #409eff;
      color: #409eff;
    }
  }

  &:not(.flex) {
    .options {
      margin: 0 16px;
    }
  }
}
</style>
