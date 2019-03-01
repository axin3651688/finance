<template>
  <div id="MobileHeadNav">
    <i class="iconfont icon-liebiao1 img" @click.stop="openHead"></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      canDrag: false,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      style: null
    };
  },
  created() {},
  computed: {},
  methods: {
    openHead() {
      console.log("11111");
    }
  }
};
</script>
<style lang="scss">
#MobileHeadNav {
  .img {
    // background: #000;
    z-index: 99999;
    font-size: 50px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>

