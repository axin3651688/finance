<template>
  <div class="ImagePreview">
    <img class="show-img" :src="hdUrl" alt="">
    <i class="close-icon el-icon-close" @click="closeImagePreview"></i>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'ImagePreview',
  props: {
    hdUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['ActionUpdateImagePreview']),
    closeImagePreview() {
      this.ActionUpdateImagePreview(null);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .ImagePreview {
    position: relative;
    width: 100%;
    height: 100%;
    &:hover {
      .close-icon {
        display: block;
      }
    }
  }

  .show-img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
  }

  .close-icon {
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    background: $colorTheme;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    transition: all .3s;
  }
</style>
