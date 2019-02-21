<template>
  <div class="bidiv">
      <span class="textStyle">
          <p>
              {{ titleText }}
          </p>
          <p>
            {{ text }}
          </p>
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
      text: "",
      titleText: ""
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
            this.titleText = title;
            this.text = "此期间无数据！";
        }else{
            this.text = "此期间无数据！";
        }
    }
  }
};
</script>
<style lang='scss' scoped>
    .bidiv{
        background-color:#189271;
        height:294px;
        text-align: center;
    }
    .textStyle {
        color:#fff;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 100px;
        font-family: 楷体;
    }
</style>
