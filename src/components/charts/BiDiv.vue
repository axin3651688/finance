<template>
  <div class="bidiv">
    <div>
      <p class="title_style">
        {{ titleText }}
      </p>
    </div>
    <div class="tuxin_style">
      <p style="margin-top:100px;">
        <span class="iconfont icon-tubiao" style="color: #F3F3F3;font-size: 60px;"></span>
        <br>
        <span class="span_text">{{ text }}</span>
      </p>
    </div>
      <!-- <span class="textStyle">
          <p>
              {{ titleText }}
          </p>
          <p>
            <span class="iconfont icon-tubiao"></span>
            <br>
            <span>{{ text }}</span>
          </p>
      </span> -->
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
        // background-color:#189271;
        height:294px;
        // text-align: center;
    }
    .textStyle {
        color:#454545;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 100px;
        font-family: 楷体;
    }
    .title_style { 
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      line-height:23px;
      color:rgba(69,69,69,1);
      opacity:1;
      padding: 16px 0px 0px 16px;
    }
    .tuxin_style {
      text-align: center;
    }
    .span_text {
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      line-height:16px;
      color:rgba(144,144,144,1);
      opacity:1;
    }
</style>
