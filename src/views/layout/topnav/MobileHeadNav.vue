<template>
  <div id="MobileHeadNav">
    <!-- @click.stop="openHead" -->
    <i
      class="iconfont icon-liebiao1 img"
      @mousedown="start"
      @mouseup="stop"
      @mousemove="move"
      :style="style"
    ></i>
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
    },
    start: function(e) {
      //鼠标左键点击
      if (e.button == 0) {
        this.canDrag = true;
        //记录鼠标指针位置
        this.x0 = e.clientX;
        this.y0 = e.clientY;
      }
    },
    stop: function(e) {
      this.canDrag = false;
    },
    move: function(e) {
      if (this.canDrag == true) {
        this.x1 = e.clientX;
        this.y1 = e.clientX;

        let x = this.x1 - this.x0;
        let y = this.y1 - this.y0;

        let img = document.querySelector("#MobileHeadNav i");
        console.log(img);
        console.log(this.canDrag);

        this.style = `left:${img.offsetLeft + x}px;top:${img.offsetTop + y}px`;
        this.x0 = this.x1;
        this.y0 = this.y1;
      }
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

