<template>
  <div class="bidiv">
      <span class="textStyle">
          {{ text }}
      </span>
  </div>
</template>
<script>
export default {
  props: {
    item: {}
  },

  data() {
    return {
      text: ""
    };
  },
  created() {
    this.upData();
  },
  watch: {},
  methods: {
    upData(item) {
        if(item){
            this.item = item;
        }
        let title = this.item.text;
        if(title){
            this.text = "此期间无数据！";
        }
    }
  }
};
</script>
<style lang='scss' scoped>
    .bidiv{
        background-color:#189271;
        height:295px;
        text-align: center;
    }
    .textStyle {
        color:#fff;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 295px;
        font-family: 楷体;
    }
</style>
